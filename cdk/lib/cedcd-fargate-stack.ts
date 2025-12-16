import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export interface CedcdFargateStackProps extends cdk.StackProps {
  vpcId?: string;
  environment?: string;
  imageUri?: string;
}

export class CedcdFargateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: CedcdFargateStackProps) {
    super(scope, id, props);

    // Get environment from props or context
    const environment = props?.environment || this.node.tryGetContext('environment') || 'dev';
    
    // Environment-specific configurations
    const envConfig = this.getEnvironmentConfig(environment);

    // VPC Configuration
    let vpc: ec2.IVpc;
    if (props?.vpcId) {
      // Use existing VPC
      vpc = ec2.Vpc.fromLookup(this, 'ExistingVpc', {
        vpcId: props.vpcId,
      });
    } else {
      // Create new VPC with public and private subnets
      vpc = new ec2.Vpc(this, 'CedcdVpc', {
        maxAzs: 2,
        natGateways: 1,
        subnetConfiguration: [
          {
            cidrMask: 24,
            name: 'Public',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            cidrMask: 24,
            name: 'Private',
            subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          },
        ],
      });
    }

    // Database Configuration
    // Read database endpoint from Parameter Store
    // The database endpoint must be configured in Parameter Store before deployment
    // Parameter Store paths:
    // - /cedcd/dev/database/endpoint
    // - /cedcd/qa/database/endpoint
    // - /cedcd/stage/database/endpoint
    // - /cedcd/prod/database/endpoint
    // Optional: /cedcd/{environment}/database/port (defaults to 3306)
    
    const dbEndpointParamName = `/cedcd/${environment}/database/endpoint`;
    const dbPortParamName = `/cedcd/${environment}/database/port`;
    
    // Get database endpoint from Parameter Store
    // Note: valueFromLookup is resolved during synthesis, so the parameter must exist
    const databaseEndpoint = ssm.StringParameter.valueFromLookup(
      this,
      dbEndpointParamName
    );
    
    // Get database port from Parameter Store (default to 3306 if not found)
    let databasePort: number = 3306;
    try {
      const dbPortParam = ssm.StringParameter.valueFromLookup(
        this,
        dbPortParamName
      );
      // valueFromLookup returns a string, parse it
      if (dbPortParam && dbPortParam !== dbPortParamName) {
        databasePort = parseInt(dbPortParam) || 3306;
      }
    } catch (e) {
      // Port parameter not found, use default
      // This is expected if the port parameter doesn't exist
    }

    // Output database endpoint for reference
    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: databaseEndpoint,
      description: `RDS MySQL endpoint (from Parameter Store: ${dbEndpointParamName})`,
    });
    
    new cdk.CfnOutput(this, 'DatabasePort', {
      value: databasePort.toString(),
      description: `RDS MySQL port (from Parameter Store: ${dbPortParamName} or default 3306)`,
    });

    // ECR Repository
    // Try to import existing repository first, otherwise create new one
    let ecrRepository: ecr.IRepository;
    const existingEcrRepo = this.node.tryGetContext('existingEcrRepository');
    
    if (existingEcrRepo) {
      ecrRepository = ecr.Repository.fromRepositoryName(
        this,
        'CedcdEcrRepository',
        existingEcrRepo
      );
    } else {
      ecrRepository = new ecr.Repository(this, 'CedcdEcrRepository', {
        repositoryName: 'cedcd',
        imageScanOnPush: true,
        lifecycleRules: [
          {
            rulePriority: 1,
            description: 'Keep last 10 images',
            maxImageCount: 10,
          },
        ],
      });
    }

    // Secrets Manager for application secrets (environment-specific)
    const appSecretsName = `cedcd/${environment}/app/secrets`;
    const appSecrets = new secretsmanager.Secret(this, 'CedcdAppSecrets', {
      secretName: appSecretsName,
      description: `CEDCD application secrets for ${environment} environment`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          oauth2_client_id: 'REPLACE_WITH_YOUR_OAUTH_CLIENT_ID',
          oauth2_secret: 'REPLACE_WITH_YOUR_OAUTH_SECRET',
        }),
        generateStringKey: 'random',
        excludeCharacters: '"@/\\',
      },
    });

    // ECS Cluster (environment-specific)
    const cluster = new ecs.Cluster(this, 'CedcdCluster', {
      vpc,
      clusterName: `cedcd-cluster-${environment}`,
      containerInsights: true,
    });

    // CloudWatch Log Group (environment-specific)
    const logGroup = new logs.LogGroup(this, 'CedcdLogGroup', {
      logGroupName: `/ecs/cedcd-${environment}`,
      retention: envConfig.logRetention,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Task Definition (environment-specific resources)
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'CedcdTaskDef', {
      memoryLimitMiB: envConfig.taskMemory,
      cpu: envConfig.taskCpu,
    });

    // Determine container image
    const imageUri = props?.imageUri || this.node.tryGetContext('imageUri');
    let containerImage: ecs.ContainerImage;
    
    if (imageUri) {
      // Use image from ECR (for CI/CD deployments)
      containerImage = ecs.ContainerImage.fromRegistry(imageUri);
    } else {
      // Build from local Dockerfile (for local development)
      containerImage = ecs.ContainerImage.fromAsset('../', {
        file: 'Dockerfile',
      });
    }

    // Container
    const container = taskDefinition.addContainer('CedcdContainer', {
      image: containerImage,
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: `cedcd-${environment}`,
        logGroup,
      }),
      environment: {
        NODE_ENV: environment === 'prod' ? 'production' : environment,
        PORT: '8221',
        LOG_DIR: '/app/deploy/log',
        FILE_PATH: '/app/deploy/data',
        LOGGER_LEVEL: envConfig.logLevel,
        ENV: environment,
        MYSQL_HOST: databaseEndpoint,
        MYSQL_PORT: databasePort.toString(),
        MYSQL_DB: 'cedcd',
        MYSQL_CONNECTIONLIMIT: '100',
        EMAIL_SMTP_HOST: 'mailfwd.nih.gov',
        EMAIL_SMTP_PORT: '25',
        EMAIL_SMTP_FROM: 'cedcdWebAdmin@nih.gov',
      },
      secrets: {
        MYSQL_USER: ecs.Secret.fromSecretsManager(
          secretsmanager.Secret.fromSecretNameV2(
            this,
            'DbSecret',
            `cedcd/${environment}/database/credentials`
          ),
          'username'
        ),
        MYSQL_PASSWORD: ecs.Secret.fromSecretsManager(
          secretsmanager.Secret.fromSecretNameV2(
            this,
            'DbPasswordSecret',
            `cedcd/${environment}/database/credentials`
          ),
          'password'
        ),
        OAUTH2_CLIENT_ID: ecs.Secret.fromSecretsManager(appSecrets, 'oauth2_client_id'),
        OAUTH2_CLIENT_SECRET: ecs.Secret.fromSecretsManager(appSecrets, 'oauth2_secret'),
      },
    });

    container.addPortMappings({
      containerPort: 8221,
      protocol: ecs.Protocol.TCP,
    });

    // Application Load Balancer with Fargate Service
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'CedcdFargateService',
      {
        cluster,
        taskDefinition,
        desiredCount: envConfig.desiredCount,
        publicLoadBalancer: true,
        listenerPort: 80,
        serviceName: `cedcd-service-${environment}`,
        healthCheckGracePeriod: cdk.Duration.seconds(60),
        assignPublicIp: true, // Required for pulling images from ECR
      }
    );

    // Configure health check
    fargateService.targetGroup.configureHealthCheck({
      path: '/',
      interval: cdk.Duration.seconds(30),
      timeout: cdk.Duration.seconds(5),
      healthyThresholdCount: 2,
      unhealthyThresholdCount: 3,
    });

    // Auto Scaling
    const scalableTarget = fargateService.service.autoScaleTaskCount({
      minCapacity: envConfig.minCapacity,
      maxCapacity: envConfig.maxCapacity,
    });

    scalableTarget.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 70,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60),
    });

    scalableTarget.scaleOnMemoryUtilization('MemoryScaling', {
      targetUtilizationPercent: 80,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60),
    });

    // Note: Since we're using existing RDS instances, security group rules
    // should be configured manually on the RDS security group to allow
    // traffic from the ECS service security group.
    // The ECS service security group will be output for reference.
    
    const ecsSecurityGroup = fargateService.service.connections.securityGroups[0];
    
    new cdk.CfnOutput(this, 'ECSSecurityGroupId', {
      value: ecsSecurityGroup.securityGroupId,
      description: 'ECS Service Security Group ID - Add this to RDS security group inbound rules',
    });

    // Outputs
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
      description: 'Application Load Balancer DNS name',
      exportName: 'CedcdLoadBalancerDNS',
    });

    new cdk.CfnOutput(this, 'ServiceURL', {
      value: `http://${fargateService.loadBalancer.loadBalancerDnsName}`,
      description: 'Service URL',
    });

    new cdk.CfnOutput(this, 'LogGroupName', {
      value: logGroup.logGroupName,
      description: 'CloudWatch Log Group name',
    });

    new cdk.CfnOutput(this, 'SecretsManagerSecret', {
      value: appSecrets.secretArn,
      description: 'Secrets Manager ARN for application secrets',
    });

    new cdk.CfnOutput(this, 'ECRRepositoryURI', {
      value: ecrRepository.repositoryUri,
      description: 'ECR Repository URI',
      exportName: `CedcdECRRepositoryURI-${environment}`,
    });
  }

  private getEnvironmentConfig(environment: string) {
    const configs: Record<string, {
      taskCpu: number;
      taskMemory: number;
      desiredCount: number;
      minCapacity: number;
      maxCapacity: number;
      logLevel: string;
      logRetention: logs.RetentionDays;
    }> = {
      dev: {
        taskCpu: 512,
        taskMemory: 1024,
        desiredCount: 1,
        minCapacity: 1,
        maxCapacity: 3,
        logLevel: 'debug',
        logRetention: logs.RetentionDays.ONE_WEEK,
      },
      qa: {
        taskCpu: 1024,
        taskMemory: 2048,
        desiredCount: 2,
        minCapacity: 2,
        maxCapacity: 5,
        logLevel: 'info',
        logRetention: logs.RetentionDays.TWO_WEEKS,
      },
      stage: {
        taskCpu: 1024,
        taskMemory: 2048,
        desiredCount: 2,
        minCapacity: 2,
        maxCapacity: 8,
        logLevel: 'info',
        logRetention: logs.RetentionDays.ONE_MONTH,
      },
      prod: {
        taskCpu: 1024,
        taskMemory: 2048,
        desiredCount: 2,
        minCapacity: 2,
        maxCapacity: 10,
        logLevel: 'info',
        logRetention: logs.RetentionDays.THREE_MONTHS,
      },
    };

    return configs[environment] || configs.dev;
  }
}


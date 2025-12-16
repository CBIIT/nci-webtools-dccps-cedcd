# CEDCD AWS Fargate CDK Infrastructure

This directory contains the AWS CDK code for deploying the CEDCD application to AWS Fargate.

## Prerequisites

1. AWS CLI configured with appropriate credentials
2. Node.js 18+ installed
3. AWS CDK CLI installed: `npm install -g aws-cdk`
4. Docker installed and running (for building container images)

## Setup

1. Install dependencies:
```bash
cd cdk
npm install
```

2. Bootstrap CDK (only needed once per account/region):
```bash
cdk bootstrap
```

## Configuration

### Environment Variables

Set the following environment variables or use AWS profiles:

```bash
export AWS_ACCOUNT_ID=your-account-id
export AWS_REGION=us-east-1
```

### Context Variables

You can pass context variables when deploying:

```bash
# Use existing VPC
cdk deploy --context vpcId=vpc-xxxxxxxxx

# Use existing database
cdk deploy --context databaseEndpoint=your-db-endpoint.region.rds.amazonaws.com
```

## Deployment

1. Build the TypeScript code:
```bash
npm run build
```

2. Synthesize CloudFormation template:
```bash
npm run synth
```

3. Deploy the stack:
```bash
npm run deploy
```

4. To deploy to a specific environment:
```bash
cdk deploy --context stackName=CedcdFargateStack-Prod
```

## Useful Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile
- `npm run test` - Run unit tests
- `cdk synth` - Emit the synthesized CloudFormation template
- `cdk deploy` - Deploy this stack to your default AWS account/region
- `cdk diff` - Compare deployed stack with current state
- `cdk destroy` - Destroy the stack

## Stack Components

- **VPC**: Virtual Private Cloud with public and private subnets
- **ECS Cluster**: Fargate cluster for running containers
- **Application Load Balancer**: Public-facing load balancer
- **Fargate Service**: Container service with auto-scaling
- **RDS MySQL**: Database instance (optional, can use existing)
- **Secrets Manager**: Secure storage for credentials
- **CloudWatch Logs**: Centralized logging

## Post-Deployment

1. Update Secrets Manager with your OAuth credentials:
   - Go to AWS Secrets Manager
   - Find the secret: `cedcd/app/secrets`
   - Update with your OAuth2 client ID and secret

2. Configure database security group to allow ECS tasks:
   - If using existing RDS, update security group to allow traffic from ECS security group

3. Set up custom domain (optional):
   - Create Route53 hosted zone
   - Add ACM certificate
   - Update ALB listener to use HTTPS



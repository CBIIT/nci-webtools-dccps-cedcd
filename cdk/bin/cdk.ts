#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CedcdFargateStack } from '../lib/cedcd-fargate-stack';

const app = new cdk.App();

// Get environment variables
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
  region: process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || 'us-east-1',
};

// Get stack configuration from context or environment
const environment = app.node.tryGetContext('environment') || 'dev';
const stackName = app.node.tryGetContext('stackName') || `CedcdFargateStack-${environment.charAt(0).toUpperCase() + environment.slice(1)}`;
const vpcId = app.node.tryGetContext('vpcId'); // Optional: use existing VPC
const imageUri = app.node.tryGetContext('imageUri'); // Optional: ECR image URI

// Note: Database endpoint is read from Parameter Store:
// /cedcd/{environment}/database/endpoint

new CedcdFargateStack(app, stackName, {
  env,
  vpcId,
  environment,
  imageUri,
  description: `CEDCD Application on AWS Fargate - ${environment}`,
});



import * as path from 'path';
import {
  Duration,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_logs as logs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface LambdaUrlStreamingAgentCoreRuntimePatternProps {
  readonly runtimeArn: string;
  readonly authType?: lambda.FunctionUrlAuthType;
}

export class LambdaUrlStreamingAgentCoreRuntimePattern extends Construct {
  public readonly function: lambda.Function;
  public readonly functionUrl: lambda.FunctionUrl;
  public readonly url: string;

  constructor(scope: Construct, id: string, props: LambdaUrlStreamingAgentCoreRuntimePatternProps) {
    super(scope, id);

    const lambdaRole = new iam.Role(this, `${id}LambdaRole`, {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['bedrock-agentcore:InvokeAgentRuntime'],
      resources: ['arn:aws:bedrock-agentcore:*:*:runtime/*'],
    }));

    this.function = new lambda.Function(this, `${id}Function`, {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../build/lambda-agentcore-runtime-lambda-url-streaming')),
      role: lambdaRole,
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.minutes(5),
      memorySize: 1024,
      environment: {
        ACORE_RUNTIME_ARN: props.runtimeArn,
      },
      logGroup: new logs.LogGroup(this, `${id}FunctionLogGroup`, {
        retention: logs.RetentionDays.ONE_WEEK,
      }),
    });

    this.functionUrl = this.function.addFunctionUrl({
      authType: props.authType || lambda.FunctionUrlAuthType.AWS_IAM,
      invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [lambda.HttpMethod.POST],
        allowedHeaders: ['*'],
      },
    });

    this.url = this.functionUrl.url;
  }
}

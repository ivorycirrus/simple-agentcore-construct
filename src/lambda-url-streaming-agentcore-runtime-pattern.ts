import * as path from 'path';
import {
  Duration,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_logs as logs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Properties for LambdaUrlStreamingAgentCoreRuntimePattern construct.
 */
export interface LambdaUrlStreamingAgentCoreRuntimePatternProps {
  /**
   * ARN of the AgentCore runtime to invoke.
   */
  readonly runtimeArn: string;

  /**
   * Authentication type for the Lambda function URL.
   * @default AWS_IAM
   */
  readonly authType?: lambda.FunctionUrlAuthType;
}

/**
 * A construct that creates a Lambda function with streaming URL to invoke AgentCore runtimes.
 *
 * This construct handles:
 * - Creating Lambda function with response streaming support
 * - Setting up Lambda function URL with CORS configuration
 * - IAM role with AgentCore invocation permissions
 * - Streaming response support via Lambda URL
 *
 * @example
 * new LambdaUrlStreamingAgentCoreRuntimePattern(this, 'LambdaUrl', {
 *   runtimeArn: runtime.runtimeArn,
 *   authType: lambda.FunctionUrlAuthType.NONE,
 * });
 */
export class LambdaUrlStreamingAgentCoreRuntimePattern extends Construct {
  /**
   * The Lambda function instance.
   */
  public readonly function: lambda.Function;

  /**
   * The Lambda function URL.
   */
  public readonly functionUrl: lambda.FunctionUrl;

  /**
   * The URL string of the Lambda function.
   */
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

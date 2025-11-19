import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaUrlStreamingAgentCoreRuntimePattern } from '../src/lambda-url-streaming-agentcore-runtime-pattern';

describe('LambdaUrlStreamingAgentCoreRuntimePattern', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  test('creates Lambda function with runtime integration', () => {
    new LambdaUrlStreamingAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::IAM::Role', 1);
  });

  test('creates IAM role with bedrock-agentcore permissions', () => {
    new LambdaUrlStreamingAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
      },
    });
  });

  test('uses AWS_IAM auth type by default', () => {
    new LambdaUrlStreamingAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Url', {
      AuthType: 'AWS_IAM',
      InvokeMode: 'RESPONSE_STREAM',
    });
  });

  test('uses custom auth type when provided', () => {
    new LambdaUrlStreamingAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Url', {
      AuthType: 'NONE',
    });
  });

  test('exposes function, functionUrl, and url', () => {
    const pattern = new LambdaUrlStreamingAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
    });

    expect(pattern.function).toBeDefined();
    expect(pattern.functionUrl).toBeDefined();
    expect(pattern.url).toBeDefined();
  });
});

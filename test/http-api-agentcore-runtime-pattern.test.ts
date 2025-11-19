import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { HttpApiAgentCoreRuntimePattern } from '../src/http-api-agentcore-runtime-pattern';

describe('HttpApiAgentCoreRuntimePattern', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  test('creates HTTP API with runtime integration', () => {
    new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimes: [
        {
          runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
          routePath: '/agent',
        },
      ],
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::ApiGatewayV2::Api', 1);
    template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::IAM::Role', 1);
  });

  test('creates authorizer when authApiKey is provided', () => {
    new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimes: [
        {
          runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
          routePath: '/agent',
        },
      ],
      authApiKey: 'test-api-key',
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::Lambda::Function', 2); // auth + runtime invoke
  });

  test('throws error when both authApiKey and authorizer are provided', () => {
    expect(() => {
      new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
        runtimes: [
          {
            runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
            routePath: '/agent',
          },
        ],
        authApiKey: 'test-api-key',
        authorizer: {} as any,
      });
    }).toThrow('Cannot specify both authApiKey and authorizer. Please provide only one.');
  });

  test('creates multiple runtime integrations', () => {
    new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimes: [
        {
          runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/runtime1',
          routePath: '/agent1',
        },
        {
          runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/runtime2',
          routePath: '/agent2',
        },
      ],
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::Lambda::Function', 2);
  });

  test('creates IAM role with bedrock-agentcore permissions', () => {
    new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimes: [
        {
          runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
          routePath: '/agent',
        },
      ],
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

  test('exposes httpApi and apiUrl', () => {
    const pattern = new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
      runtimes: [
        {
          runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
          routePath: '/agent',
        },
      ],
    });

    expect(pattern.httpApi).toBeDefined();
    expect(pattern.apiUrl).toBeDefined();
  });
});

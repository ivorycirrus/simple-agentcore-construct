import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { HttpApiAgentCoreRuntimePattern } from '../src/http-api-agentcore-runtime-pattern';

describe('HttpApiAgentCoreRuntimePattern', () => {
  describe('validation', () => {
    let app: App;
    let stack: Stack;

    beforeEach(() => {
      app = new App();
      stack = new Stack(app, 'TestStack');
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
  });

  describe('resource creation', () => {
    let template: Template;
    let pattern: HttpApiAgentCoreRuntimePattern;

    beforeAll(() => {
      const app = new App();
      const stack = new Stack(app, 'TestStack');

      pattern = new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
        runtimes: [
          {
            runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
            routePath: '/agent',
          },
        ],
      });

      template = Template.fromStack(stack);
    });

    test('creates HTTP API with runtime integration', () => {
      template.resourceCountIs('AWS::ApiGatewayV2::Api', 1);
      template.resourceCountIs('AWS::Lambda::Function', 1);
      template.resourceCountIs('AWS::IAM::Role', 1);
    });

    test('creates IAM role with bedrock-agentcore permissions', () => {
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
      expect(pattern.httpApi).toBeDefined();
      expect(pattern.apiUrl).toBeDefined();
    });
  });

  describe('with authApiKey', () => {
    let template: Template;

    beforeAll(() => {
      const app = new App();
      const stack = new Stack(app, 'TestStack');

      new HttpApiAgentCoreRuntimePattern(stack, 'TestPattern', {
        runtimes: [
          {
            runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
            routePath: '/agent',
          },
        ],
        authApiKey: 'test-api-key',
      });

      template = Template.fromStack(stack);
    });

    test('creates authorizer when authApiKey is provided', () => {
      template.resourceCountIs('AWS::Lambda::Function', 2); // auth + runtime invoke
    });
  });

  describe('with multiple runtimes', () => {
    let template: Template;

    beforeAll(() => {
      const app = new App();
      const stack = new Stack(app, 'TestStack');

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

      template = Template.fromStack(stack);
    });

    test('creates multiple runtime integrations', () => {
      template.resourceCountIs('AWS::Lambda::Function', 2);
    });
  });
});

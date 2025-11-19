import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { WebsocketAgentCoreRuntimePattern } from '../src/websocket-agentcore-runtime-pattern';

describe('WebsocketAgentCoreRuntimePattern', () => {
  describe('validation', () => {
    let app: App;
    let stack: Stack;

    beforeEach(() => {
      app = new App();
      stack = new Stack(app, 'TestStack');
    });

    test('throws error when both authApiKey and authorizer are provided', () => {
      expect(() => {
        new WebsocketAgentCoreRuntimePattern(stack, 'TestPattern', {
          runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
          authApiKey: 'test-api-key',
          authorizer: {} as any,
        });
      }).toThrow('Cannot specify both authApiKey and authorizer. Please provide only one.');
    });
  });

  describe('resource creation', () => {
    let template: Template;
    let pattern: WebsocketAgentCoreRuntimePattern;

    beforeAll(() => {
      const app = new App();
      const stack = new Stack(app, 'TestStack');

      pattern = new WebsocketAgentCoreRuntimePattern(stack, 'TestPattern', {
        runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
      });

      template = Template.fromStack(stack);
    });

    test('creates WebSocket API with runtime integration', () => {
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

    test('exposes webSocketApi, webSocketStage, and webSocketUrl', () => {
      expect(pattern.webSocketApi).toBeDefined();
      expect(pattern.webSocketStage).toBeDefined();
      expect(pattern.webSocketUrl).toBeDefined();
    });
  });

  describe('with authApiKey', () => {
    let template: Template;

    beforeAll(() => {
      const app = new App();
      const stack = new Stack(app, 'TestStack');

      new WebsocketAgentCoreRuntimePattern(stack, 'TestPattern', {
        runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
        authApiKey: 'test-api-key',
      });

      template = Template.fromStack(stack);
    });

    test('creates authorizer when authApiKey is provided', () => {
      template.resourceCountIs('AWS::Lambda::Function', 2); // auth + websocket handler
    });
  });

  describe('with custom route path', () => {
    let template: Template;

    beforeAll(() => {
      const app = new App();
      const stack = new Stack(app, 'TestStack');

      new WebsocketAgentCoreRuntimePattern(stack, 'TestPattern', {
        runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/test-runtime',
        routePath: 'custom',
      });

      template = Template.fromStack(stack);
    });

    test('uses custom route path when provided', () => {
      template.resourceCountIs('AWS::ApiGatewayV2::Route', 3); // connect, disconnect, custom
    });
  });
});

import * as path from 'path';
import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SimpleAgentCoreRuntime } from '../src';

const TEST_AGENT_PATH = path.join(__dirname, 'fixtures', 'test-agent');

describe('SimpleAgentCoreRuntime', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  test('creates runtime with required resources', () => {
    new SimpleAgentCoreRuntime(stack, 'TestAgent', {
      agentName: 'test_agent',
      agentSrcPath: TEST_AGENT_PATH,
    });

    const template = Template.fromStack(stack);

    // Check ECR Repository
    template.resourceCountIs('AWS::ECR::Repository', 1);

    // Check IAM Roles (includes execution role + custom resource roles)
    const roles = template.findResources('AWS::IAM::Role');
    expect(Object.keys(roles).length).toBeGreaterThanOrEqual(1);

    // Check Bedrock AgentCore Runtime
    template.resourceCountIs('AWS::BedrockAgentCore::Runtime', 1);
  });

  test('validates agentName format', () => {
    expect(() => {
      new SimpleAgentCoreRuntime(stack, 'TestAgent', {
        agentName: 'Invalid-Name',
        agentSrcPath: TEST_AGENT_PATH,
      });
    }).toThrow('agentName must contain only lowercase letters, numbers, and underscores (snake_case)');
  });

  test('validates agentName length', () => {
    expect(() => {
      new SimpleAgentCoreRuntime(stack, 'TestAgent', {
        agentName: 'a'.repeat(41),
        agentSrcPath: TEST_AGENT_PATH,
      });
    }).toThrow('agentName must be 40 characters or less');
  });

  test('validates agentName is not empty', () => {
    expect(() => {
      new SimpleAgentCoreRuntime(stack, 'TestAgent', {
        agentName: '',
        agentSrcPath: TEST_AGENT_PATH,
      });
    }).toThrow('agentName must be a non-empty string');
  });

  test('validates agentSrcPath is not empty', () => {
    expect(() => {
      new SimpleAgentCoreRuntime(stack, 'TestAgent', {
        agentName: 'test_agent',
        agentSrcPath: '',
      });
    }).toThrow('agentSrcPath must be a non-empty string');
  });

  test('uses provided ECR repository name', () => {
    new SimpleAgentCoreRuntime(stack, 'TestAgent', {
      agentName: 'test_agent',
      agentSrcPath: TEST_AGENT_PATH,
      ecrRepositoryName: 'custom-repo',
    });

    const template = Template.fromStack(stack);

    // Should not create new ECR repository
    template.resourceCountIs('AWS::ECR::Repository', 0);
  });

  test('creates IAM role with correct permissions', () => {
    new SimpleAgentCoreRuntime(stack, 'TestAgent', {
      agentName: 'test_agent',
      agentSrcPath: TEST_AGENT_PATH,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'bedrock-agentcore.amazonaws.com',
            },
          },
        ],
      },
    });
  });

  test('sets environment variables', () => {
    new SimpleAgentCoreRuntime(stack, 'TestAgent', {
      agentName: 'test_agent',
      agentSrcPath: TEST_AGENT_PATH,
      environmentVariables: {
        LOG_LEVEL: 'INFO',
        API_KEY: 'test-key',
      },
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::BedrockAgentCore::Runtime', {
      EnvironmentVariables: {
        LOG_LEVEL: 'INFO',
        API_KEY: 'test-key',
      },
    });
  });

  test('exposes runtime outputs', () => {
    const runtime = new SimpleAgentCoreRuntime(stack, 'TestAgent', {
      agentName: 'test_agent',
      agentSrcPath: TEST_AGENT_PATH,
    });

    expect(runtime.runtimeExecutionRole).toBeDefined();
    expect(runtime.runtimeId).toBeDefined();
    expect(runtime.runtimeVersion).toBeDefined();
    expect(runtime.runtimeArn).toBeDefined();
  });
});

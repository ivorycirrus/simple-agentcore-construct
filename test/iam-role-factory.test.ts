import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IamRoleFactory } from '../src/iam-role-factory';

describe('IamRoleFactory', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  describe('createRuntimeExecutionRole', () => {
    test('creates IAM role', () => {
      const role = IamRoleFactory.createRuntimeExecutionRole(stack, 'Test', 'test_agent');

      expect(role).toBeDefined();
      expect(role.roleArn).toBeDefined();
    });

    test('creates IAM role with correct trust policy', () => {
      IamRoleFactory.createRuntimeExecutionRole(stack, 'Test', 'test_agent');

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

    test('role has inline policy', () => {
      IamRoleFactory.createRuntimeExecutionRole(stack, 'Test', 'test_agent');

      const template = Template.fromStack(stack);

      const roles = template.findResources('AWS::IAM::Role');
      const executionRole = Object.values(roles).find((role: any) =>
        role.Properties?.Policies?.length > 0,
      );

      expect(executionRole).toBeDefined();
      if (executionRole) {
        expect(executionRole.Properties.Policies).toBeDefined();
        expect(executionRole.Properties.Policies.length).toBeGreaterThan(0);
      }
    });
  });

  describe('createServiceLinkedRoles', () => {
    test('creates custom resources for SLRs', () => {
      IamRoleFactory.createServiceLinkedRoles(stack, 'Test');

      const template = Template.fromStack(stack);

      // Should create 2 custom resources (Network SLR + Runtime SLR)
      template.resourceCountIs('Custom::AWS', 2);
    });

    test('creates resources with correct IDs', () => {
      IamRoleFactory.createServiceLinkedRoles(stack, 'Test');

      const template = Template.fromStack(stack);

      const resources = template.findResources('Custom::AWS');
      const resourceIds = Object.keys(resources);

      expect(resourceIds).toContain('TestNetworkSLR66A61178');
      expect(resourceIds).toContain('TestRuntimeSLRD08972A1');
    });
  });
});

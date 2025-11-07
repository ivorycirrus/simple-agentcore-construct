import { aws_iam as iam, Stack, custom_resources as cr } from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

/**
 * Factory class for creating IAM roles and service-linked roles required by Bedrock AgentCore.
 */
export class IamRoleFactory {

  /**
   * Creates an IAM role for Bedrock AgentCore runtime execution.
   *
   * The role includes permissions for:
   * - ECR image access
   * - CloudWatch Logs
   * - X-Ray tracing
   * - CloudWatch metrics
   * - Bedrock model invocation
   * - AgentCore workload identity
   *
   * @param ctx - The parent construct
   * @param id - The construct ID
   * @param agentName - The name of the agent runtime
   * @returns The created IAM role
   */
  public static createRuntimeExecutionRole(ctx: Construct, id: string, agentName: string): iam.Role {
    const stack = Stack.of(ctx);

    const role = new iam.Role(ctx, `${id}ExecRole`, {
      assumedBy: new iam.ServicePrincipal('bedrock-agentcore.amazonaws.com').withConditions({
        StringEquals: {
          'aws:SourceAccount': stack.account,
        },
        ArnLike: {
          'aws:SourceArn': `arn:aws:bedrock-agentcore:${stack.region}:${stack.account}:*`,
        },
      }),
      inlinePolicies: {
        AgentCoreExecutionPolicy: this.createExecutionPolicy(stack, agentName),
      },
    });

    this.addNagSuppressions(role, stack, agentName);
    return role;
  }

  /**
   * Creates service-linked roles required by Bedrock AgentCore.
   *
   * This method creates two service-linked roles:
   * - Network SLR for network configuration
   * - Runtime Identity SLR for workload identity management
   *
   * If the roles already exist, the errors are ignored.
   *
   * @param ctx - The parent construct
   * @param id - The construct ID
   */
  public static createServiceLinkedRoles(ctx: Construct, id: string): void {
    // Create Network SLR with error handling
    new cr.AwsCustomResource(ctx, `${id}NetworkSLR`, {
      onCreate: {
        service: 'IAM',
        action: 'createServiceLinkedRole',
        parameters: {
          AWSServiceName: 'network.bedrock-agentcore.amazonaws.com',
          Description: 'Service-linked role for Bedrock AgentCore Network',
        },
        physicalResourceId: cr.PhysicalResourceId.of('bedrock-agentcore-network-slr'),
        ignoreErrorCodesMatching: 'InvalidInput',
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    // Create Runtime Identity SLR with error handling
    new cr.AwsCustomResource(ctx, `${id}RuntimeSLR`, {
      onCreate: {
        service: 'IAM',
        action: 'createServiceLinkedRole',
        parameters: {
          AWSServiceName: 'runtime-identity.bedrock-agentcore.amazonaws.com',
          Description: 'Service-linked role for Bedrock AgentCore Runtime Identity',
        },
        physicalResourceId: cr.PhysicalResourceId.of('bedrock-agentcore-runtime-slr'),
        ignoreErrorCodesMatching: 'InvalidInput',
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }

  private static createExecutionPolicy(stack: Stack, agentName: string): iam.PolicyDocument {
    return new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          sid: 'ECRImageAccess',
          effect: iam.Effect.ALLOW,
          actions: ['ecr:BatchGetImage', 'ecr:GetDownloadUrlForLayer'],
          resources: [`arn:aws:ecr:${stack.region}:${stack.account}:repository/*`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['logs:DescribeLogStreams', 'logs:CreateLogGroup'],
          resources: [`arn:aws:logs:${stack.region}:${stack.account}:log-group:/aws/bedrock-agentcore/runtimes/*`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['logs:DescribeLogGroups'],
          resources: [`arn:aws:logs:${stack.region}:${stack.account}:log-group:*`],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
          resources: [`arn:aws:logs:${stack.region}:${stack.account}:log-group:/aws/bedrock-agentcore/runtimes/*:log-stream:*`],
        }),
        new iam.PolicyStatement({
          sid: 'ECRTokenAccess',
          effect: iam.Effect.ALLOW,
          actions: ['ecr:GetAuthorizationToken'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords', 'xray:GetSamplingRules', 'xray:GetSamplingTargets'],
          resources: ['*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['cloudwatch:PutMetricData'],
          resources: ['*'],
          conditions: {
            StringEquals: {
              'cloudwatch:namespace': 'bedrock-agentcore',
            },
          },
        }),
        new iam.PolicyStatement({
          sid: 'GetAgentAccessToken',
          effect: iam.Effect.ALLOW,
          actions: [
            'bedrock-agentcore:GetWorkloadAccessToken',
            'bedrock-agentcore:GetWorkloadAccessTokenForJWT',
            'bedrock-agentcore:GetWorkloadAccessTokenForUserId',
          ],
          resources: [
            `arn:aws:bedrock-agentcore:${stack.region}:${stack.account}:workload-identity-directory/default`,
            `arn:aws:bedrock-agentcore:${stack.region}:${stack.account}:workload-identity-directory/default/workload-identity/${agentName}-*`,
          ],
        }),
        new iam.PolicyStatement({
          sid: 'BedrockModelInvocation',
          effect: iam.Effect.ALLOW,
          actions: ['bedrock:InvokeModel', 'bedrock:InvokeModelWithResponseStream'],
          resources: [
            'arn:aws:bedrock:*::foundation-model/*',
            `arn:aws:bedrock:${stack.region}:${stack.account}:*`,
          ],
        }),
      ],
    });
  }

  private static addNagSuppressions(role: iam.Role, stack: Stack, agentName: string): void {
    NagSuppressions.addResourceSuppressions(role, [
      {
        id: 'AwsSolutions-IAM5',
        reason: 'ECR repository wildcard required for AgentCore to access multiple container images',
        appliesTo: [`Resource::arn:aws:ecr:${stack.region}:${stack.account}:repository/*`],
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'CloudWatch Logs wildcard required for AgentCore runtime logging',
        appliesTo: [`Resource::arn:aws:logs:${stack.region}:${stack.account}:log-group:/aws/bedrock-agentcore/runtimes/*`],
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'CloudWatch Logs describe operation requires wildcard access',
        appliesTo: [`Resource::arn:aws:logs:${stack.region}:${stack.account}:log-group:*`],
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'CloudWatch Logs stream wildcard required for AgentCore runtime logging',
        appliesTo: [`Resource::arn:aws:logs:${stack.region}:${stack.account}:log-group:/aws/bedrock-agentcore/runtimes/*:log-stream:*`],
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'ECR GetAuthorizationToken, X-Ray, and CloudWatch operations require global wildcard access',
        appliesTo: ['Resource::*'],
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Bedrock AgentCore workload identity wildcard required for agent runtime access',
        appliesTo: [`Resource::arn:aws:bedrock-agentcore:${stack.region}:${stack.account}:workload-identity-directory/default/workload-identity/${agentName}-*`],
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Bedrock foundation model wildcard required for cross-region model access',
        appliesTo: ['Resource::arn:aws:bedrock:*::foundation-model/*'],
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Bedrock service wildcard required for AgentCore operations',
        appliesTo: [`Resource::arn:aws:bedrock:${stack.region}:${stack.account}:*`],
      },
    ]);
  }
}

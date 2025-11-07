import {
  aws_iam as iam,
  aws_ecr as ecr,
  aws_ecr_assets as ecr_assets,
  aws_bedrockagentcore as acore,
  Stack,
  RemovalPolicy,
} from 'aws-cdk-lib';
import { ECRDeployment, DockerImageName } from 'cdk-ecr-deployment';
import { Construct } from 'constructs';
import { IamRoleFactory } from './iam-role-factory';

/**
 * Properties for SimpleAgentCoreRuntime construct.
 */
export interface SimpleAgentCoreRuntimeProps {
  /**
   * The name of the Bedrock AgentCore runtime.
   * This will be used as the runtime name and default ECR repository name.
   */
  readonly agentName: string;

  /**
   * Path to the agent source code directory containing Dockerfile.
   */
  readonly agentSrcPath: string;

  /**
   * ECR repository name for the agent container image.
   * @default - Creates a new repository named with agentName
   */
  readonly ecrRepositoryName?: string;

  /**
   * IAM role for the AgentCore runtime execution.
   * @default - Creates a new role with required Bedrock AgentCore permissions
   */
  readonly runtimeExecutionRole?: iam.Role;

  /**
   * Network configuration for the AgentCore runtime.
   * @default - PUBLIC network mode: { networkMode: 'PUBLIC' }
   */
  readonly networkConfiguration?: acore.CfnRuntime.NetworkConfigurationProperty;

  /**
   * Environment variables to pass to the agent container.
   * @default - No environment variables
   */
  readonly environmentVariables?: Record<string, string>;

  /**
   * Description of the agent runtime.
   * @default - No description
   */
  readonly agentDescription?: string;
}

/**
 * A construct that creates an AWS Bedrock AgentCore runtime.
 *
 * This construct handles:
 * - Building and deploying Docker container images to ECR
 * - Creating IAM roles and service-linked roles
 * - Configuring Bedrock AgentCore runtime with network and environment settings
 *
 * @example
 * new SimpleAgentCoreRuntime(this, 'MyAgent', {
 *   agentName: 'my-bedrock-agent',
 *   agentSrcPath: './agent-code',
 * });
 */
export class SimpleAgentCoreRuntime extends Construct {
  /**
   * The IAM role used by the AgentCore runtime.
   */
  public readonly runtimeExecutionRole: iam.Role;

  /**
   * The unique identifier of the AgentCore runtime.
   */
  public readonly runtimeId: string;

  /**
   * The version of the AgentCore runtime.
   */
  public readonly runtimeVersion: string;

  /**
   * The ARN of the AgentCore runtime.
   */
  public readonly runtimeArn: string;

  constructor(scope: Construct, id: string, props: SimpleAgentCoreRuntimeProps) {
    super(scope, id);

    // Validate agentName
    if (!props.agentName || props.agentName.trim().length === 0) {
      throw new Error('agentName must be a non-empty string');
    }
    if (props.agentName.length > 40) {
      throw new Error('agentName must be 40 characters or less');
    }
    if (!/^[a-z0-9_]+$/.test(props.agentName)) {
      throw new Error('agentName must contain only lowercase letters, numbers, and underscores (snake_case)');
    }

    // Validate agentSrcPath
    if (!props.agentSrcPath || props.agentSrcPath.trim().length === 0) {
      throw new Error('agentSrcPath must be a non-empty string');
    }

    const stack = Stack.of(this);

    // Create required service-linked roles for Bedrock AgentCore
    IamRoleFactory.createServiceLinkedRoles(this, id);

    // Set up runtime execution role
    this.runtimeExecutionRole = props.runtimeExecutionRole ?? IamRoleFactory.createRuntimeExecutionRole(this, id, props.agentName);

    // Build agent container image
    const image = this.buildDockerImage(id, props.agentSrcPath);

    // Deploy Container image to ECR
    const ecrRepoName = this.getOrCreateEcrRepository(id, props.agentName, props.ecrRepositoryName);
    const containerImageUri = `${stack.account}.dkr.ecr.${stack.region}.amazonaws.com/${ecrRepoName}:latest`;
    const ecrDeploy = new ECRDeployment(this, `${id}EcrDeploy`, {
      src: new DockerImageName(image.imageUri),
      dest: new DockerImageName(containerImageUri),
    });

    // Set up network configuration
    const networkConfiguration = props.networkConfiguration ?? { networkMode: 'PUBLIC' };

    // Create the Bedrock AgentCore runtime
    const cfnRuntime = new acore.CfnRuntime(this, `${id}Runtime`, {
      agentRuntimeName: props.agentName,
      agentRuntimeArtifact: {
        containerConfiguration: {
          containerUri: containerImageUri,
        },
      },
      networkConfiguration,
      roleArn: this.runtimeExecutionRole.roleArn,
      environmentVariables: props.environmentVariables,
    });
    cfnRuntime.node.addDependency(ecrDeploy);

    // Set up deployed attributes
    this.runtimeId = cfnRuntime.attrAgentRuntimeId;
    this.runtimeVersion = cfnRuntime.attrAgentRuntimeVersion;
    this.runtimeArn = cfnRuntime.attrAgentRuntimeArn;
  }

  private getOrCreateEcrRepository(id: string, agentName: string, ecrRepositoryName?: string): string {
    if (ecrRepositoryName) {
      return ecrRepositoryName;
    }

    const ecrRepo = new ecr.Repository(this, `${id}Ecr`, {
      repositoryName: agentName,
      removalPolicy: RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });
    return ecrRepo.repositoryName;
  }

  private buildDockerImage(id: string, agentSrcPath: string): ecr_assets.DockerImageAsset {
    return new ecr_assets.DockerImageAsset(this, `${id}Image`, {
      directory: agentSrcPath,
      platform: ecr_assets.Platform.LINUX_ARM64,
    });
  }
}

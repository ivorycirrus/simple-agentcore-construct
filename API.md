# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SimpleAgentCoreRuntime <a name="SimpleAgentCoreRuntime" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime"></a>

A construct that creates an AWS Bedrock AgentCore runtime.

This construct handles:
- Building and deploying Docker container images to ECR
- Creating IAM roles and service-linked roles
- Configuring Bedrock AgentCore runtime with network and environment settings

*Example*

```typescript
new SimpleAgentCoreRuntime(this, 'MyAgent', {
  agentName: 'my-bedrock-agent',
  agentSrcPath: './agent-code',
});
```


#### Initializers <a name="Initializers" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.Initializer"></a>

```typescript
import { SimpleAgentCoreRuntime } from 'simple-agentcore-runtime-patterns'

new SimpleAgentCoreRuntime(scope: Construct, id: string, props: SimpleAgentCoreRuntimeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.Initializer.parameter.props">props</a></code> | <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps">SimpleAgentCoreRuntimeProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.Initializer.parameter.props"></a>

- *Type:* <a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps">SimpleAgentCoreRuntimeProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.isConstruct"></a>

```typescript
import { SimpleAgentCoreRuntime } from 'simple-agentcore-runtime-patterns'

SimpleAgentCoreRuntime.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeArn">runtimeArn</a></code> | <code>string</code> | The ARN of the AgentCore runtime. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeExecutionRole">runtimeExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | The IAM role used by the AgentCore runtime. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeId">runtimeId</a></code> | <code>string</code> | The unique identifier of the AgentCore runtime. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeVersion">runtimeVersion</a></code> | <code>string</code> | The version of the AgentCore runtime. |

---

##### `node`<sup>Required</sup> <a name="node" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `runtimeArn`<sup>Required</sup> <a name="runtimeArn" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeArn"></a>

```typescript
public readonly runtimeArn: string;
```

- *Type:* string

The ARN of the AgentCore runtime.

---

##### `runtimeExecutionRole`<sup>Required</sup> <a name="runtimeExecutionRole" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeExecutionRole"></a>

```typescript
public readonly runtimeExecutionRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

The IAM role used by the AgentCore runtime.

---

##### `runtimeId`<sup>Required</sup> <a name="runtimeId" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeId"></a>

```typescript
public readonly runtimeId: string;
```

- *Type:* string

The unique identifier of the AgentCore runtime.

---

##### `runtimeVersion`<sup>Required</sup> <a name="runtimeVersion" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntime.property.runtimeVersion"></a>

```typescript
public readonly runtimeVersion: string;
```

- *Type:* string

The version of the AgentCore runtime.

---


## Structs <a name="Structs" id="Structs"></a>

### SimpleAgentCoreRuntimeProps <a name="SimpleAgentCoreRuntimeProps" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps"></a>

Properties for SimpleAgentCoreRuntime construct.

#### Initializer <a name="Initializer" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.Initializer"></a>

```typescript
import { SimpleAgentCoreRuntimeProps } from 'simple-agentcore-runtime-patterns'

const simpleAgentCoreRuntimeProps: SimpleAgentCoreRuntimeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.agentName">agentName</a></code> | <code>string</code> | The name of the Bedrock AgentCore runtime. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.agentSrcPath">agentSrcPath</a></code> | <code>string</code> | Path to the agent source code directory containing Dockerfile. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.agentDescription">agentDescription</a></code> | <code>string</code> | Description of the agent runtime. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.ecrRepositoryName">ecrRepositoryName</a></code> | <code>string</code> | ECR repository name for the agent container image. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.environmentVariables">environmentVariables</a></code> | <code>{[ key: string ]: string}</code> | Environment variables to pass to the agent container. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.networkConfiguration">networkConfiguration</a></code> | <code>aws-cdk-lib.aws_bedrockagentcore.CfnRuntime.NetworkConfigurationProperty</code> | Network configuration for the AgentCore runtime. |
| <code><a href="#simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.runtimeExecutionRole">runtimeExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | IAM role for the AgentCore runtime execution. |

---

##### `agentName`<sup>Required</sup> <a name="agentName" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.agentName"></a>

```typescript
public readonly agentName: string;
```

- *Type:* string

The name of the Bedrock AgentCore runtime.

This will be used as the runtime name and default ECR repository name.

---

##### `agentSrcPath`<sup>Required</sup> <a name="agentSrcPath" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.agentSrcPath"></a>

```typescript
public readonly agentSrcPath: string;
```

- *Type:* string

Path to the agent source code directory containing Dockerfile.

---

##### `agentDescription`<sup>Optional</sup> <a name="agentDescription" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.agentDescription"></a>

```typescript
public readonly agentDescription: string;
```

- *Type:* string
- *Default:* No description

Description of the agent runtime.

---

##### `ecrRepositoryName`<sup>Optional</sup> <a name="ecrRepositoryName" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.ecrRepositoryName"></a>

```typescript
public readonly ecrRepositoryName: string;
```

- *Type:* string
- *Default:* Creates a new repository named with agentName

ECR repository name for the agent container image.

---

##### `environmentVariables`<sup>Optional</sup> <a name="environmentVariables" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.environmentVariables"></a>

```typescript
public readonly environmentVariables: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables

Environment variables to pass to the agent container.

---

##### `networkConfiguration`<sup>Optional</sup> <a name="networkConfiguration" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.networkConfiguration"></a>

```typescript
public readonly networkConfiguration: NetworkConfigurationProperty;
```

- *Type:* aws-cdk-lib.aws_bedrockagentcore.CfnRuntime.NetworkConfigurationProperty
- *Default:* PUBLIC network mode: { networkMode: 'PUBLIC' }

Network configuration for the AgentCore runtime.

---

##### `runtimeExecutionRole`<sup>Optional</sup> <a name="runtimeExecutionRole" id="simple-agentcore-runtime-patterns.SimpleAgentCoreRuntimeProps.property.runtimeExecutionRole"></a>

```typescript
public readonly runtimeExecutionRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role
- *Default:* Creates a new role with required Bedrock AgentCore permissions

IAM role for the AgentCore runtime execution.

---

## Classes <a name="Classes" id="Classes"></a>

### IamRoleFactory <a name="IamRoleFactory" id="simple-agentcore-runtime-patterns.IamRoleFactory"></a>

Factory class for creating IAM roles and service-linked roles required by Bedrock AgentCore.

#### Initializers <a name="Initializers" id="simple-agentcore-runtime-patterns.IamRoleFactory.Initializer"></a>

```typescript
import { IamRoleFactory } from 'simple-agentcore-runtime-patterns'

new IamRoleFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.IamRoleFactory.createRuntimeExecutionRole">createRuntimeExecutionRole</a></code> | Creates an IAM role for Bedrock AgentCore runtime execution. |
| <code><a href="#simple-agentcore-runtime-patterns.IamRoleFactory.createServiceLinkedRoles">createServiceLinkedRoles</a></code> | Creates service-linked roles required by Bedrock AgentCore. |

---

##### `createRuntimeExecutionRole` <a name="createRuntimeExecutionRole" id="simple-agentcore-runtime-patterns.IamRoleFactory.createRuntimeExecutionRole"></a>

```typescript
import { IamRoleFactory } from 'simple-agentcore-runtime-patterns'

IamRoleFactory.createRuntimeExecutionRole(ctx: Construct, id: string, agentName: string)
```

Creates an IAM role for Bedrock AgentCore runtime execution.

The role includes permissions for:
- ECR image access
- CloudWatch Logs
- X-Ray tracing
- CloudWatch metrics
- Bedrock model invocation
- AgentCore workload identity

###### `ctx`<sup>Required</sup> <a name="ctx" id="simple-agentcore-runtime-patterns.IamRoleFactory.createRuntimeExecutionRole.parameter.ctx"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="simple-agentcore-runtime-patterns.IamRoleFactory.createRuntimeExecutionRole.parameter.id"></a>

- *Type:* string

The construct ID.

---

###### `agentName`<sup>Required</sup> <a name="agentName" id="simple-agentcore-runtime-patterns.IamRoleFactory.createRuntimeExecutionRole.parameter.agentName"></a>

- *Type:* string

The name of the agent runtime.

---

##### `createServiceLinkedRoles` <a name="createServiceLinkedRoles" id="simple-agentcore-runtime-patterns.IamRoleFactory.createServiceLinkedRoles"></a>

```typescript
import { IamRoleFactory } from 'simple-agentcore-runtime-patterns'

IamRoleFactory.createServiceLinkedRoles(ctx: Construct, id: string)
```

Creates service-linked roles required by Bedrock AgentCore.

This method creates two service-linked roles:
- Network SLR for network configuration
- Runtime Identity SLR for workload identity management

If the roles already exist, the errors are ignored.

###### `ctx`<sup>Required</sup> <a name="ctx" id="simple-agentcore-runtime-patterns.IamRoleFactory.createServiceLinkedRoles.parameter.ctx"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="simple-agentcore-runtime-patterns.IamRoleFactory.createServiceLinkedRoles.parameter.id"></a>

- *Type:* string

The construct ID.

---





# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### HttpApiAgentCoreRuntimePattern <a name="HttpApiAgentCoreRuntimePattern" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern"></a>

#### Initializers <a name="Initializers" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.Initializer"></a>

```typescript
import { HttpApiAgentCoreRuntimePattern } from 'simple-agentcore-runtime-patterns'

new HttpApiAgentCoreRuntimePattern(scope: Construct, id: string, props: HttpApiAgentCoreRuntimePatternProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.Initializer.parameter.props">props</a></code> | <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps">HttpApiAgentCoreRuntimePatternProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.Initializer.parameter.props"></a>

- *Type:* <a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps">HttpApiAgentCoreRuntimePatternProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.addRuntimeInvoke">addRuntimeInvoke</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addRuntimeInvoke` <a name="addRuntimeInvoke" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.addRuntimeInvoke"></a>

```typescript
public addRuntimeInvoke(config: RuntimeInvokeConfig, suffix: string): void
```

###### `config`<sup>Required</sup> <a name="config" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.addRuntimeInvoke.parameter.config"></a>

- *Type:* <a href="#simple-agentcore-runtime-patterns.RuntimeInvokeConfig">RuntimeInvokeConfig</a>

---

###### `suffix`<sup>Required</sup> <a name="suffix" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.addRuntimeInvoke.parameter.suffix"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.isConstruct"></a>

```typescript
import { HttpApiAgentCoreRuntimePattern } from 'simple-agentcore-runtime-patterns'

HttpApiAgentCoreRuntimePattern.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.property.apiUrl">apiUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.property.httpApi">httpApi</a></code> | <code>aws-cdk-lib.aws_apigatewayv2.HttpApi</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `apiUrl`<sup>Required</sup> <a name="apiUrl" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.property.apiUrl"></a>

```typescript
public readonly apiUrl: string;
```

- *Type:* string

---

##### `httpApi`<sup>Required</sup> <a name="httpApi" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePattern.property.httpApi"></a>

```typescript
public readonly httpApi: HttpApi;
```

- *Type:* aws-cdk-lib.aws_apigatewayv2.HttpApi

---


### LambdaUrlStreamingAgentCoreRuntimePattern <a name="LambdaUrlStreamingAgentCoreRuntimePattern" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern"></a>

#### Initializers <a name="Initializers" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.Initializer"></a>

```typescript
import { LambdaUrlStreamingAgentCoreRuntimePattern } from 'simple-agentcore-runtime-patterns'

new LambdaUrlStreamingAgentCoreRuntimePattern(scope: Construct, id: string, props: LambdaUrlStreamingAgentCoreRuntimePatternProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.Initializer.parameter.props">props</a></code> | <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps">LambdaUrlStreamingAgentCoreRuntimePatternProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.Initializer.parameter.props"></a>

- *Type:* <a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps">LambdaUrlStreamingAgentCoreRuntimePatternProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.isConstruct"></a>

```typescript
import { LambdaUrlStreamingAgentCoreRuntimePattern } from 'simple-agentcore-runtime-patterns'

LambdaUrlStreamingAgentCoreRuntimePattern.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.function">function</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.functionUrl">functionUrl</a></code> | <code>aws-cdk-lib.aws_lambda.FunctionUrl</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.url">url</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `function`<sup>Required</sup> <a name="function" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.function"></a>

```typescript
public readonly function: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `functionUrl`<sup>Required</sup> <a name="functionUrl" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.functionUrl"></a>

```typescript
public readonly functionUrl: FunctionUrl;
```

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrl

---

##### `url`<sup>Required</sup> <a name="url" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePattern.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---


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


### WebsocketAgentCoreRuntimePattern <a name="WebsocketAgentCoreRuntimePattern" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern"></a>

#### Initializers <a name="Initializers" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.Initializer"></a>

```typescript
import { WebsocketAgentCoreRuntimePattern } from 'simple-agentcore-runtime-patterns'

new WebsocketAgentCoreRuntimePattern(scope: Construct, id: string, props: WebsocketAgentCoreRuntimePatternProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.Initializer.parameter.props">props</a></code> | <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps">WebsocketAgentCoreRuntimePatternProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.Initializer.parameter.props"></a>

- *Type:* <a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps">WebsocketAgentCoreRuntimePatternProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.isConstruct"></a>

```typescript
import { WebsocketAgentCoreRuntimePattern } from 'simple-agentcore-runtime-patterns'

WebsocketAgentCoreRuntimePattern.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.webSocketApi">webSocketApi</a></code> | <code>aws-cdk-lib.aws_apigatewayv2.WebSocketApi</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.webSocketStage">webSocketStage</a></code> | <code>aws-cdk-lib.aws_apigatewayv2.WebSocketStage</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.webSocketUrl">webSocketUrl</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `webSocketApi`<sup>Required</sup> <a name="webSocketApi" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.webSocketApi"></a>

```typescript
public readonly webSocketApi: WebSocketApi;
```

- *Type:* aws-cdk-lib.aws_apigatewayv2.WebSocketApi

---

##### `webSocketStage`<sup>Required</sup> <a name="webSocketStage" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.webSocketStage"></a>

```typescript
public readonly webSocketStage: WebSocketStage;
```

- *Type:* aws-cdk-lib.aws_apigatewayv2.WebSocketStage

---

##### `webSocketUrl`<sup>Required</sup> <a name="webSocketUrl" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePattern.property.webSocketUrl"></a>

```typescript
public readonly webSocketUrl: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### HttpApiAgentCoreRuntimePatternProps <a name="HttpApiAgentCoreRuntimePatternProps" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps"></a>

#### Initializer <a name="Initializer" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps.Initializer"></a>

```typescript
import { HttpApiAgentCoreRuntimePatternProps } from 'simple-agentcore-runtime-patterns'

const httpApiAgentCoreRuntimePatternProps: HttpApiAgentCoreRuntimePatternProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps.property.runtimes">runtimes</a></code> | <code><a href="#simple-agentcore-runtime-patterns.RuntimeInvokeConfig">RuntimeInvokeConfig</a>[]</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps.property.authApiKey">authApiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps.property.authorizer">authorizer</a></code> | <code>aws-cdk-lib.aws_apigatewayv2.IHttpRouteAuthorizer</code> | *No description.* |

---

##### `runtimes`<sup>Required</sup> <a name="runtimes" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps.property.runtimes"></a>

```typescript
public readonly runtimes: RuntimeInvokeConfig[];
```

- *Type:* <a href="#simple-agentcore-runtime-patterns.RuntimeInvokeConfig">RuntimeInvokeConfig</a>[]

---

##### `authApiKey`<sup>Optional</sup> <a name="authApiKey" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps.property.authApiKey"></a>

```typescript
public readonly authApiKey: string;
```

- *Type:* string

---

##### `authorizer`<sup>Optional</sup> <a name="authorizer" id="simple-agentcore-runtime-patterns.HttpApiAgentCoreRuntimePatternProps.property.authorizer"></a>

```typescript
public readonly authorizer: IHttpRouteAuthorizer;
```

- *Type:* aws-cdk-lib.aws_apigatewayv2.IHttpRouteAuthorizer

---

### LambdaUrlStreamingAgentCoreRuntimePatternProps <a name="LambdaUrlStreamingAgentCoreRuntimePatternProps" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps"></a>

#### Initializer <a name="Initializer" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps.Initializer"></a>

```typescript
import { LambdaUrlStreamingAgentCoreRuntimePatternProps } from 'simple-agentcore-runtime-patterns'

const lambdaUrlStreamingAgentCoreRuntimePatternProps: LambdaUrlStreamingAgentCoreRuntimePatternProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps.property.runtimeArn">runtimeArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps.property.authType">authType</a></code> | <code>aws-cdk-lib.aws_lambda.FunctionUrlAuthType</code> | *No description.* |

---

##### `runtimeArn`<sup>Required</sup> <a name="runtimeArn" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps.property.runtimeArn"></a>

```typescript
public readonly runtimeArn: string;
```

- *Type:* string

---

##### `authType`<sup>Optional</sup> <a name="authType" id="simple-agentcore-runtime-patterns.LambdaUrlStreamingAgentCoreRuntimePatternProps.property.authType"></a>

```typescript
public readonly authType: FunctionUrlAuthType;
```

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlAuthType

---

### RuntimeInvokeConfig <a name="RuntimeInvokeConfig" id="simple-agentcore-runtime-patterns.RuntimeInvokeConfig"></a>

#### Initializer <a name="Initializer" id="simple-agentcore-runtime-patterns.RuntimeInvokeConfig.Initializer"></a>

```typescript
import { RuntimeInvokeConfig } from 'simple-agentcore-runtime-patterns'

const runtimeInvokeConfig: RuntimeInvokeConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.RuntimeInvokeConfig.property.routePath">routePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.RuntimeInvokeConfig.property.runtimeArn">runtimeArn</a></code> | <code>string</code> | *No description.* |

---

##### `routePath`<sup>Required</sup> <a name="routePath" id="simple-agentcore-runtime-patterns.RuntimeInvokeConfig.property.routePath"></a>

```typescript
public readonly routePath: string;
```

- *Type:* string

---

##### `runtimeArn`<sup>Required</sup> <a name="runtimeArn" id="simple-agentcore-runtime-patterns.RuntimeInvokeConfig.property.runtimeArn"></a>

```typescript
public readonly runtimeArn: string;
```

- *Type:* string

---

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

### WebsocketAgentCoreRuntimePatternProps <a name="WebsocketAgentCoreRuntimePatternProps" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps"></a>

#### Initializer <a name="Initializer" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.Initializer"></a>

```typescript
import { WebsocketAgentCoreRuntimePatternProps } from 'simple-agentcore-runtime-patterns'

const websocketAgentCoreRuntimePatternProps: WebsocketAgentCoreRuntimePatternProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.runtimeArn">runtimeArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.authApiKey">authApiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.authorizer">authorizer</a></code> | <code>aws-cdk-lib.aws_apigatewayv2.IWebSocketRouteAuthorizer</code> | *No description.* |
| <code><a href="#simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.routePath">routePath</a></code> | <code>string</code> | *No description.* |

---

##### `runtimeArn`<sup>Required</sup> <a name="runtimeArn" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.runtimeArn"></a>

```typescript
public readonly runtimeArn: string;
```

- *Type:* string

---

##### `authApiKey`<sup>Optional</sup> <a name="authApiKey" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.authApiKey"></a>

```typescript
public readonly authApiKey: string;
```

- *Type:* string

---

##### `authorizer`<sup>Optional</sup> <a name="authorizer" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.authorizer"></a>

```typescript
public readonly authorizer: IWebSocketRouteAuthorizer;
```

- *Type:* aws-cdk-lib.aws_apigatewayv2.IWebSocketRouteAuthorizer

---

##### `routePath`<sup>Optional</sup> <a name="routePath" id="simple-agentcore-runtime-patterns.WebsocketAgentCoreRuntimePatternProps.property.routePath"></a>

```typescript
public readonly routePath: string;
```

- *Type:* string

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





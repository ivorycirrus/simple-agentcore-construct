# Simple AgentCore Runtime Patterns

An AWS CDK construct library for deploying AWS Bedrock AgentCore runtimes.

This library helps you deploy containerized AI agents to AWS Bedrock AgentCore using AWS CDK. It handles Docker image building, ECR deployment, IAM roles, and runtime configuration automatically.

## Requirements

- Node.js 22 or later
- Docker or Finch (for building container images)
- AWS CDK v2.221.0 or later

## Quick Start

### AWS CDK(TypeScript)

#### Install

```bash
npm install simple-agentcore-runtime-patterns
```

#### Example

```typescript
import {
  SimpleAgentCoreRuntime,
  HttpApiAgentCoreRuntimePattern,
  WebsocketAgentCoreRuntimePattern,
  LambdaUrlStreamingAgentCoreRuntimePattern,
} from "simple-agentcore-runtime-patterns";

// Create AgentCore Runtime
const acr = new SimpleAgentCoreRuntime(stack, "MyAgent", {
  agentName: "my_bedrock_agent", // Required: snake_case, max 40 chars
  agentSrcPath: "./my-agent-code", // Required: path to your agent code
});

// [Pattern 1] HTTP API
const httpApi = new HttpApiAgentCoreRuntimePattern(this, "HttpApiPattern", {
  runtimes: [{ runtimeArn: acr.runtimeArn, routePath: "/sync" }],
  authApiKey: "prototype",
});

// [Pattern 2] WebSocket for streaming response
const websocket = new WebsocketAgentCoreRuntimePattern(
  this,
  "WebsocketPattern",
  {
    runtimeArn: acr.runtimeArn,
    authApiKey: "prototype",
  }
);

// [Pattern 3] Lambda URL for streaming response
const lambdaUrl = new LambdaUrlStreamingAgentCoreRuntimePattern(
  this,
  "LambdaUrlPattern",
  {
    runtimeArn: acr.runtimeArn,
  }
);
```

### AWS CDK(Python)

#### Install

```bash
pip install simple-agentcore-runtime-patterns
```

#### Example

```python
from simple_agentcore_runtime_patterns import SimpleAgentCoreRuntime
from simple_agentcore_runtime_patterns import HttpApiAgentCoreRuntimePattern, WebsocketAgentCoreRuntimePattern, LambdaUrlStreamingAgentCoreRuntimePattern

# Create AgentCore Runtime
acr = SimpleAgentCoreRuntime(stack, "MyAgent",
    agent_name="my_bedrock_agent",      # Required: snake_case, max 40 chars
    agent_src_path="./my-agent-code",   # Required: path to your agent code
)

# [Pattern 1] HTTP API
http_api = HttpApiAgentCoreRuntimePattern(self, "HttpApiPattern", runtimes=[{"runtimeArn": acr.runtime_arn, "routePath": "/sync"}], auth_api_key="prototype")

# [Pattern 2] WebSocket for streaming response
websocket = WebsocketAgentCoreRuntimePattern(self, "WebsocketPattern", runtime_arn=acr.runtime_arn, auth_api_key="prototype")

# [Pattern 3] Lambda URL for streaming response
lambda_url = LambdaUrlStreamingAgentCoreRuntimePattern(self, "LambdaUrlPattern", runtime_arn=acr.runtime_arn)
```

## Architecture

```
Input Properties                                                         Outputs
─────────────────                                                        ───────
• agentName                                                              • runtimeId
• agentSrcPath       ┌────────────────────────────────────────────┐     • runtimeVersion
                 ───▶│ SimpleAgentCoreRuntime Construct           │────▶• runtimeArn
                     │                                             │     • runtimeExecutionRole
                     │  ┌──────────────────────────────────────┐  │
                     │  │ IAM Role                             │  │
                     │  │ (AgentCoreRuntimeExecutionRole)      │  │
                     │  │  • ECR access                        │  │
                     │  │  • CloudWatch Logs                   │  │
                     │  │  • Bedrock model invocation          │  │
                     │  └──────────────────┬───────────────────┘  │
                     │                     │                       │
                     │  ┌──────────────────▼───────────────────┐  │
Docker Image ────────┼─▶│ ECR Repository                       │  │
(from agentSrcPath)  │  │  • Stores container image            │  │
                     │  │  • Tag: latest                       │  │
                     │  └──────────────────┬───────────────────┘  │
                     │                     │                       │
                     │  ┌──────────────────▼───────────────────┐  │
                     │  │ Bedrock AgentCore Runtime            │  │
                     │  │  • Runs your agent container         │  │
                     │  │  • Network: PUBLIC (default)         │  │
                     │  │  • Environment variables             │  │
                     │  └──────────────────────────────────────┘  │
                     │                                             │
                     └────────────────────────────────────────────┘
                                      │
                                      │ checks & creates if needed
                                      ▼
                     ┌────────────────────────────────────────────┐
                     │ Service-Linked Roles (Outside Construct)   │
                     │  • Network SLR                             │
                     │  • Runtime Identity SLR                    │
                     └────────────────────────────────────────────┘
```

## Documentation

- [API Documentation](./API.md) - Complete API reference
- [AGENTS.md](./AGENTS.md) - Guide for AI coding assistants

## License

MIT-0

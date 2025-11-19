import * as path from 'path';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
import {
  Duration,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_logs as logs,
  aws_apigatewayv2 as apigwv2,
  aws_apigatewayv2_authorizers as apigwv2_auth,
} from 'aws-cdk-lib';
import { WebSocketLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';

/**
 * Properties for WebsocketAgentCoreRuntimePattern construct.
 */
export interface WebsocketAgentCoreRuntimePatternProps {
  /**
   * ARN of the AgentCore runtime to invoke.
   */
  readonly runtimeArn: string;

  /**
   * API key for simple authentication. Creates a Lambda authorizer.
   * Cannot be used with `authorizer`.
   * @default - No authentication
   */
  readonly authApiKey?: string;

  /**
   * Custom WebSocket route authorizer.
   * Cannot be used with `authApiKey`.
   * @default - No authentication
   */
  readonly authorizer?: apigwv2.IWebSocketRouteAuthorizer;

  /**
   * Custom route path for WebSocket messages.
   * @default 'message'
   */
  readonly routePath?: string;
}

/**
 * A construct that creates a WebSocket API Gateway to invoke AgentCore runtimes with streaming support.
 *
 * This construct handles:
 * - Creating WebSocket API Gateway with connect/disconnect/message routes
 * - Setting up Lambda function to invoke AgentCore runtime
 * - Optional API key or custom authentication
 * - Streaming response support via WebSocket
 *
 * @example
 * new WebsocketAgentCoreRuntimePattern(this, 'WebSocket', {
 *   runtimeArn: runtime.runtimeArn,
 *   authApiKey: 'my-secret-key',
 * });
 */
export class WebsocketAgentCoreRuntimePattern extends Construct {
  /**
   * The WebSocket API Gateway instance.
   */
  public readonly webSocketApi: apigwv2.WebSocketApi;

  /**
   * The WebSocket API stage.
   */
  public readonly webSocketStage: apigwv2.WebSocketStage;

  /**
   * The URL of the WebSocket API.
   */
  public readonly webSocketUrl: string;

  constructor(scope: Construct, id: string, props: WebsocketAgentCoreRuntimePatternProps) {
    super(scope, id);

    if (props.authApiKey && props.authorizer) {
      throw new Error('Cannot specify both authApiKey and authorizer. Please provide only one.');
    }

    const lambdaRole = new iam.Role(this, `${id}LambdaRole`, {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['bedrock-agentcore:InvokeAgentRuntime'],
      resources: ['arn:aws:bedrock-agentcore:*:*:runtime/*'],
    }));

    const fnWebSocket = new PythonFunction(this, `${id}Function`, {
      entry: path.join(__dirname, '../lambda/agentcore-runtime-websocket-api'),
      runtime: lambda.Runtime.PYTHON_3_13,
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.minutes(15),
      role: lambdaRole,
      environment: {
        ARN_AGENTCORE_RUNTIME: props.runtimeArn,
      },
      logGroup: new logs.LogGroup(this, `${id}FunctionLogGroup`, {
        retention: logs.RetentionDays.ONE_WEEK,
      }),
    });

    let wsAuthorizer: apigwv2.IWebSocketRouteAuthorizer | undefined;

    if (props.authApiKey) {
      const authorizerFunction = new PythonFunction(this, `${id}AuthFunction`, {
        entry: path.join(__dirname, '../lambda/simple-api-auth'),
        runtime: lambda.Runtime.PYTHON_3_13,
        architecture: lambda.Architecture.ARM_64,
        timeout: Duration.seconds(30),
        environment: {
          VALID_API_KEY: props.authApiKey,
        },
        logGroup: new logs.LogGroup(this, `${id}AuthFunctionLogGroup`, {
          retention: logs.RetentionDays.ONE_WEEK,
        }),
      });

      wsAuthorizer = new apigwv2_auth.WebSocketLambdaAuthorizer(`${id}Authorizer`, authorizerFunction, {
        authorizerName: `${id}-authorizer`,
        identitySource: ['route.request.header.x-api-key'],
      });
    } else if (props.authorizer) {
      wsAuthorizer = props.authorizer;
    }

    this.webSocketApi = new apigwv2.WebSocketApi(this, `${id}WebSocketApi`, {
      apiName: `${id}-websocket-api`,
      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(`${id}ConnectIntegration`, fnWebSocket),
        authorizer: wsAuthorizer,
      },
      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(`${id}DisconnectIntegration`, fnWebSocket),
      },
    });

    this.webSocketApi.addRoute(props.routePath || 'message', {
      integration: new WebSocketLambdaIntegration(`${id}MessageIntegration`, fnWebSocket),
    });

    this.webSocketStage = new apigwv2.WebSocketStage(this, `${id}WebSocketStage`, {
      webSocketApi: this.webSocketApi,
      stageName: 'prod',
      autoDeploy: true,
    });

    fnWebSocket.grantInvoke(new iam.ServicePrincipal('apigateway.amazonaws.com'));

    fnWebSocket.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['execute-api:ManageConnections'],
      resources: ['arn:aws:execute-api:*:*:*'],
    }));

    this.webSocketUrl = this.webSocketStage.url;
  }
}

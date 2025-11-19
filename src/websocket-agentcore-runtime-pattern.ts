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

export interface WebsocketAgentCoreRuntimePatternProps {
  readonly runtimeArn: string;
  readonly authApiKey?: string;
  readonly authorizer?: apigwv2.IWebSocketRouteAuthorizer;
  readonly routePath?: string;
}

export class WebsocketAgentCoreRuntimePattern extends Construct {
  public readonly webSocketApi: apigwv2.WebSocketApi;
  public readonly webSocketStage: apigwv2.WebSocketStage;
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

import * as path from 'path';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
import {
  Duration,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_logs as logs,
  aws_apigatewayv2 as apigwv2,
  aws_apigatewayv2_integrations as apigwv2_integration,
  aws_apigatewayv2_authorizers as apigwv2_auth,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Configuration for a runtime invocation route.
 */
export interface RuntimeInvokeConfig {
  /**
   * ARN of the AgentCore runtime to invoke.
   */
  readonly runtimeArn: string;

  /**
   * HTTP route path for this runtime.
   */
  readonly routePath: string;
}

/**
 * Properties for HttpApiAgentCoreRuntimePattern construct.
 */
export interface HttpApiAgentCoreRuntimePatternProps {
  /**
   * Array of runtime configurations to expose via HTTP API.
   */
  readonly runtimes: RuntimeInvokeConfig[];

  /**
   * API key for simple authentication. Creates a Lambda authorizer.
   * Cannot be used with `authorizer`.
   * @default - No authentication
   */
  readonly authApiKey?: string;

  /**
   * Custom HTTP route authorizer.
   * Cannot be used with `authApiKey`.
   * @default - No authentication
   */
  readonly authorizer?: apigwv2.IHttpRouteAuthorizer;
}

/**
 * A construct that creates an HTTP API Gateway to invoke AgentCore runtimes.
 *
 * This construct handles:
 * - Creating HTTP API Gateway with CORS configuration
 * - Setting up Lambda functions to invoke AgentCore runtimes
 * - Optional API key or custom authentication
 * - Multiple runtime endpoints
 *
 * @example
 * new HttpApiAgentCoreRuntimePattern(this, 'HttpApi', {
 *   runtimes: [
 *     { runtimeArn: runtime.runtimeArn, routePath: '/agent' }
 *   ],
 *   authApiKey: 'my-secret-key',
 * });
 */
export class HttpApiAgentCoreRuntimePattern extends Construct {
  /**
   * The HTTP API Gateway instance.
   */
  public readonly httpApi: apigwv2.HttpApi;

  /**
   * The URL of the HTTP API.
   */
  public readonly apiUrl: string;

  /**
   * IAM role used by Lambda functions to invoke AgentCore runtimes.
   */
  private readonly lambdaRole: iam.Role;

  constructor(scope: Construct, id: string, props: HttpApiAgentCoreRuntimePatternProps) {
    super(scope, id);

    if (props.authApiKey && props.authorizer) {
      throw new Error('Cannot specify both authApiKey and authorizer. Please provide only one.');
    }

    this.lambdaRole = new iam.Role(this, `${id}LambdaRole`, {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    this.lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['bedrock-agentcore:InvokeAgentRuntime'],
      resources: ['arn:aws:bedrock-agentcore:*:*:runtime/*'],
    }));

    let defaultAuthorizer: apigwv2.IHttpRouteAuthorizer | undefined;

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

      defaultAuthorizer = new apigwv2_auth.HttpLambdaAuthorizer(`${id}Authorizer`, authorizerFunction, {
        authorizerName: `${id}-authorizer`,
        responseTypes: [apigwv2_auth.HttpLambdaResponseType.SIMPLE],
        identitySource: ['$request.header.x-api-key'],
      });
    } else if (props.authorizer) {
      defaultAuthorizer = props.authorizer;
    }

    this.httpApi = new apigwv2.HttpApi(this, `${id}HttpApi`, {
      apiName: `${id}-http-api`,
      defaultAuthorizer,
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [apigwv2.CorsHttpMethod.POST, apigwv2.CorsHttpMethod.OPTIONS],
        allowHeaders: ['*'],
      },
    });

    props.runtimes.forEach((runtime, index) => {
      this.addRuntimeInvoke(`Runtime${index}`, runtime);
    });

    this.apiUrl = this.httpApi.apiEndpoint;
  }

  /**
   * Adds a new runtime invocation endpoint to the HTTP API.
   *
   * @param id - Unique identifier for CDK resource naming
   * @param config - Runtime configuration including ARN and route path
   */
  public addRuntimeInvoke(id: string, config: RuntimeInvokeConfig): void {
    const fnInvoke = new PythonFunction(this, `${id}Function`, {
      entry: path.join(__dirname, '../lambda/agentcore-runtime-http-api'),
      runtime: lambda.Runtime.PYTHON_3_13,
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.minutes(15),
      role: this.lambdaRole,
      environment: {
        ARN_AGENTCORE_RUNTIME: config.runtimeArn,
      },
      logGroup: new logs.LogGroup(this, `${id}FunctionLogGroup`, {
        retention: logs.RetentionDays.ONE_WEEK,
      }),
    });

    const integration = new apigwv2_integration.HttpLambdaIntegration(
      `${id}Integration`,
      fnInvoke,
      {
        payloadFormatVersion: apigwv2.PayloadFormatVersion.VERSION_2_0,
      },
    );

    this.httpApi.addRoutes({
      path: config.routePath,
      methods: [apigwv2.HttpMethod.POST],
      integration: integration,
    });
  }
}

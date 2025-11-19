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

export interface RuntimeInvokeConfig {
  readonly runtimeArn: string;
  readonly routePath: string;
}

export interface HttpApiAgentCoreRuntimePatternProps {
  readonly runtimes: RuntimeInvokeConfig[];
  readonly authApiKey?: string;
  readonly authorizer?: apigwv2.IHttpRouteAuthorizer;
}

export class HttpApiAgentCoreRuntimePattern extends Construct {
  public readonly httpApi: apigwv2.HttpApi;
  public readonly apiUrl: string;
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
      this.addRuntimeInvoke(runtime, `Runtime${index}`);
    });

    this.apiUrl = this.httpApi.apiEndpoint;
  }

  public addRuntimeInvoke(config: RuntimeInvokeConfig, suffix: string): void {
    const fnInvoke = new PythonFunction(this, `${suffix}Function`, {
      entry: path.join(__dirname, '../lambda/agentcore-runtime-http-api'),
      runtime: lambda.Runtime.PYTHON_3_13,
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.minutes(15),
      role: this.lambdaRole,
      environment: {
        ARN_AGENTCORE_RUNTIME: config.runtimeArn,
      },
      logGroup: new logs.LogGroup(this, `${suffix}FunctionLogGroup`, {
        retention: logs.RetentionDays.ONE_WEEK,
      }),
    });

    const integration = new apigwv2_integration.HttpLambdaIntegration(
      `${suffix}Integration`,
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

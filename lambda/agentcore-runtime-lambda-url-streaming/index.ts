import { BedrockAgentCoreClient, InvokeAgentRuntimeCommand } from '@aws-sdk/client-bedrock-agentcore';
import { randomUUID } from 'crypto';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const client = new BedrockAgentCoreClient();

// ref : https://docs.aws.amazon.com/lambda/latest/dg/response-streaming-tutorial.html
export const handler = awslambda.streamifyResponse(async (event, responseStream) => {
  try {
    // Parse request
    const body = JSON.parse(event.body || '{}');
    const prompt = body.prompt || 'Hello';
    const sessionId = body.session_id || randomUUID();

    // Invoke agent
    const command = new InvokeAgentRuntimeCommand({
      agentRuntimeArn: process.env.ACORE_RUNTIME_ARN,
      runtimeSessionId: sessionId,
      payload: Buffer.from(JSON.stringify({ prompt }))
    });

    const response = await client.send(command);
    
    // Stream response
    await pipeline(Readable.from(response.response), responseStream);
    
  } catch (error: any) {
    responseStream.write(JSON.stringify({ 
      error: error.message || 'Unknown error',
      type: error.name || 'Error'
    }));
  } finally {
    responseStream.end();
  }
});
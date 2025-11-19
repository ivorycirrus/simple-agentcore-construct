import boto3
from botocore.config import Config
import json
import os
import logging
import uuid

logger = logging.getLogger()
logger.setLevel(logging.INFO)

AGENT_ARN = os.environ.get("ARN_AGENTCORE_RUNTIME")
agent_core_client = boto3.client('bedrock-agentcore', config=Config(connect_timeout=850, read_timeout=850))


def handler(event, context):
    logger.info(f"Event: {event}")

    # Parse request
    body = json.loads(event.get('body', '{}'))
    prompt = body.get('prompt', 'Hello')
    session_id = body.get('session_id', str(uuid.uuid4()))

    try:
        # Invoke agent
        response = agent_core_client.invoke_agent_runtime(
            agentRuntimeArn=AGENT_ARN,
            runtimeSessionId=session_id,
            payload=json.dumps({"prompt": prompt}).encode()
        )

        # Collect response chunks
        chunks = [item for item in response.get("response", [])]
        full_response = b''.join(chunks).decode("utf-8")
        
        logger.info(f"Response: {full_response}")

        # Parse JSON response
        try:
            output = json.loads(full_response)
        except json.JSONDecodeError:
            output = {"message": full_response}

        return {
            'statusCode': 200,
            'body': json.dumps(output)
        }

    except Exception as e:
        logger.error(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

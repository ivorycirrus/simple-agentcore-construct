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


def send_message(connection_id, endpoint_url, message):
    """Send message to WebSocket client"""
    try:
        client = boto3.client('apigatewaymanagementapi', endpoint_url=endpoint_url)
        client.post_to_connection(
            ConnectionId=connection_id,
            Data=json.dumps(message).encode('utf-8')
        )
    except Exception as e:
        logger.error(f"Error sending message: {e}")


def handler(event, context):
    logger.info(f"Event: {event}")
    
    route_key = event.get('requestContext', {}).get('routeKey')
    connection_id = event.get('requestContext', {}).get('connectionId')
    domain_name = event.get('requestContext', {}).get('domainName')
    stage = event.get('requestContext', {}).get('stage')
    endpoint_url = f"https://{domain_name}/{stage}"
    
    # Handle WebSocket routes
    if route_key == '$connect':
        return {'statusCode': 200}
    
    elif route_key == '$disconnect':
        return {'statusCode': 200}
    
    elif route_key == 'message':
        # Parse message
        body = json.loads(event.get('body', '{}'))
        prompt = body.get('prompt', 'Hello')
        session_id = body.get('session_id', str(uuid.uuid4()))
        
        # Prepare payload
        payload = json.dumps({"prompt": prompt}).encode()
        
        try:
            # Invoke agent
            response = agent_core_client.invoke_agent_runtime(
                agentRuntimeArn=AGENT_ARN,
                runtimeSessionId=session_id,
                payload=payload
            )
            
            # Stream response to WebSocket
            events = []
            for item in response.get("response", []):
                events.append(item)
                chunk_data = item.decode('utf-8') if isinstance(item, bytes) else str(item)
                
                # Send chunk with original data
                send_message(connection_id, endpoint_url, {
                    'type': 'chunk',
                    'data': chunk_data
                })
            
            # Send completion message
            combined_bytes = b''.join(events)
            full_response = combined_bytes.decode("utf-8")
            
            try:
                output = json.loads(full_response)
            except json.JSONDecodeError:
                output = {"text": full_response}
            
            send_message(connection_id, endpoint_url, {
                'type': 'complete',
                'data': output,
                'session_id': session_id
            })
            
        except Exception as e:
            logger.error(f"Error: {e}")
            send_message(connection_id, endpoint_url, {
                'type': 'error',
                'message': str(e)
            })
        
        return {'statusCode': 200}
    
    return {'statusCode': 400, 'body': 'Invalid route'}

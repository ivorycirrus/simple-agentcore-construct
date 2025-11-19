import os
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

VALID_API_KEY = os.environ.get("VALID_API_KEY", "prototype")


def handler(event, context):
    logger.info(f"Event: {event}")
    
    # Get x-api-key from headers
    headers = event.get('headers', {})
    api_key = headers.get('x-api-key', '')
    
    # Validate API key
    is_authorized = api_key == VALID_API_KEY
    
    logger.info(f"Authorization result: {is_authorized}")
    
    # Return simple response for HTTP API Lambda authorizer
    return {
        'isAuthorized': is_authorized
    }

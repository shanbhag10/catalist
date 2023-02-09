import json
import boto3
import uuid
from datetime import datetime

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('nayalist')
    item_uuid = str(uuid.uuid4())[:5]
    
    response = table.put_item(
        Item={
            'uuid' : item_uuid,
            'listId' : event['listId'],
            'createdAt': str(datetime.now()),
            'name' : event['name']
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps(response),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
    }
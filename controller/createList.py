import json
import boto3
import uuid
from datetime import datetime

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table1 = dynamodb.Table('nayalist')
    
    headers = {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
    
    listId = event["listId"]
    createdBy = event["createdBy"]

    # Create list
    try:
        response = table1.put_item(
            Item={
                'uuid' : listId,
                'listId' : listId,
                'isList' : True,
                'createdAt': str(datetime.now()),
                'createdBy': createdBy,
                'description' : event["description"],
                'listType': event["listType"]
            },
            ConditionExpression='attribute_not_exists(listId)'
        )
    except:
        ret = {"errorReason" : "LIST_ID_EXISTS"}
        return {
            'statusCode': 400,
            'body': json.dumps(ret),
            'headers': headers
        }
    
    ret = {
        "listId" : listId, 
        "description": event["description"], 
        "createdBy": createdBy, 
        "listType": event["listType"],
        'createdAt': str(datetime.now())
    }

    return {
        'statusCode': 200,
        'body': json.dumps(ret),
        'headers': headers
    }
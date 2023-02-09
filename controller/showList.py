import json
import boto3
import uuid
from datetime import datetime
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    print(event)
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('nayalist')
    
    response = table.query(IndexName='listId-index', KeyConditionExpression=Key('listId').eq(event['listId']))
    print("Query List Response : ", response)
    
    createdBy = ""
    name = ""
    for item in response['Items']:
        if 'isList' in item and item['isList'] == True:
            createdBy = item['createdBy'] if 'createdBy' in item else 'n/a'
    
    table2 = dynamodb.Table('users')
    response2 = table2.put_item(
        Item={
            'uid' : event['listId'] + "_" + event['username'] + "_" + createdBy,
            'username' : event['username'],
            'createdBy': createdBy,
            'listId' : event['listId'],
            'createdAt': str(datetime.now())
        }
    )
    

    return {
        'statusCode': 200,
        'body': json.dumps(response['Items']),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
    }
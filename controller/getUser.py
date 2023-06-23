import json
import boto3
import uuid
from datetime import datetime
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    
    headers = {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
    username = event['username']
    ret = {"username": username}
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('users')
    
    getResponse = table.get_item(Key={
        "uid": username
    })

    if 'Item' not in getResponse.keys():
        createResponse = table.put_item(
            Item={
                'uid' : username,
                'username' : username,
                'password' : event["password"],
                'createdAt' : str(datetime.now())
            }
        )   
    else:
        user = getResponse['Item']
        
        if user['password'] != event['password']:
            ret = {"errorReason" : "INCORRECT_PASSWORD"}
            return {
                'statusCode': 400,
                'body': json.dumps(ret),
                'headers': headers,
            } 

    return {
        'statusCode': 200,
        'body': json.dumps(ret),
        'headers': headers,
    }
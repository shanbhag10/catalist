import json
import boto3
import uuid
from datetime import datetime
from datetime import timedelta
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('users')
    username = event['username']
    
    response = table.query(IndexName='username-index', KeyConditionExpression=Key('username').eq(event['username']))
    
    myLists = []
    recentlyViewed = []
    
    for item in response['Items']:
        if item['uid'] == username:
            continue
        
        createdAt = item['createdAt']
        
        if item['createdBy'] == username:
            myLists.append({
                "listId":item["listId"], 
                "createdAt":createdAt
            })
        
        recentlyViewed.append({
                "listId":item["listId"],
                "createdBy":item['createdBy'], 
                "viewedAt":createdAt
            })
        
    recentlyViewed.sort(key=lambda x: datetime.strptime(x['viewedAt'], '%Y-%m-%d %H:%M:%S.%f'), reverse=True)
    myLists.sort(key=lambda x: datetime.strptime(x['createdAt'], '%Y-%m-%d %H:%M:%S.%f'), reverse=True)
    
    ret = {
        "myLists" : myLists,
        "recentlyViewed": recentlyViewed
    }

    return {
        'statusCode': 200,
        'body': json.dumps(ret),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
    }
import json
import boto3

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('nayalist')
    
    response = table.delete_item(Key={"uuid": event["itemId"], "listId": event["listId"]})

    return {
        'statusCode': 200,
        'body': json.dumps(response),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
    }

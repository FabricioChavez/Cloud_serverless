import boto3
import json

s3 = boto3.client('s3')
sns_client = boto3.client('sns')


def lambda_handler(event, context):
    print(event)
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    name = key.split('_')
    extension = name[-1].split('.')
    firstname = name[0]
    lastName = name[1]
    tenant_id = extension[0]

    data_registro = {
        'tenant_id': tenant_id,
        'firstname': firstname,
        'lastname': lastName,
        'bucket': bucket,
        'key': key
    }

    response_sns = sns_client.publish(
        TopicArn='arn:aws:sns:us-east-1:221064814177:Tema-Registro-Empleado',
        Subject='Nuevo Empleado',
        Message=json.dumps(data_registro),
        MessageAttributes={
            'tenant_id': {'DataType': 'String', 'StringValue': tenant_id}
        }

    )

    print("COSAS DEL RESPONSE :\n")
    print(response_sns)
    print("ACA TERMINA :\n")
    # Salida (json)
    return {
        'statusCode': 200,
        'response': response_sns
    }

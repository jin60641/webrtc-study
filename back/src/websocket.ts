import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import db from './models';

const apiGateway = new AWS.ApiGatewayManagementApi({ endpoint: process.env.API_GATEWAY_URI });

export const handler: APIGatewayProxyHandler = async (event) => {
  const context = event.requestContext;
  const connectionId = context.connectionId!;
  const routeKey = context.routeKey as '$connect' | '$disconnect' | '$default';
  try {
    if (routeKey === '$connect') {
      await db.Session.create({ connectionId });
    } else if (routeKey === '$disconnect') {
      const session = db.Session.findOne({ connectionId });
      if (!session) {
        throw new Error('Session not exists!');
      }
      await session.remove();
    } else {
      const payload = JSON.parse(event.body!);

      switch (payload.type) {
        case 'message': {
          await broadcastMessageToClient(connectionId, payload);
          break;
        }
        default: {
          throw new Error(`Invalid message: ${JSON.stringify(payload)}`);
        }
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: `Malformed event body: ${event.body}`,
    };
  }

  return {
    statusCode: 200,
    body: 'Success',
  };
};

const sendMessageToClient = async (connectionId: string, message: any) => {
  await apiGateway.postToConnection({
    ConnectionId: connectionId,
    Data: JSON.stringify(message),
  }).promise();
}

const broadcastMessageToClient = async (senderId: string, message: any) => {
  const sessions = await db.Session.find({});
  const connectionIds = sessions
    .map(({ connectionId }) => connectionId)
    .filter((connectionId) => connectionId !== senderId)

  await Promise.all(connectionIds.map(connectionId => sendMessageToClient(connectionId, {
    ...message,
    connectionId: senderId,
  })));
}

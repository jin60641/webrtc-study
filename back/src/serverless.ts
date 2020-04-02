import serverlessHttp from 'serverless-http';
import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import Koa from 'koa';
import app from 'app';

// for serverless offline
export interface SlsExtendableOfflineEvent extends APIGatewayEvent {
  isOffline?: boolean;
}

const slsApp = serverlessHttp(app, {
  request(req: Koa.Context, event: SlsExtendableOfflineEvent) {
    if (!event.isOffline) {
      // remove CDN Prefix if exists, for sls-offline (ex. /route/prefix)
      if (this && this.prefix) {
        const cdnPrefix = req.url.split(this.prefix)[0];
        req.url = req.url.replace(cdnPrefix, '');
      }
    }
    // pass lambda's requestContext for auth, etc.
    req.context = event.requestContext;
  },
});

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
) => slsApp(event, context);

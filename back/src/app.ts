import Koa from 'koa';
import koaBody from 'koa-body';
import koaCors from '@koa/cors';
import router from 'api/router';
import logger from 'middleware/logger';
import dotenv from 'dotenv'

dotenv.config()

const app = new Koa();

app.use(logger());
app.use(koaCors());
app.use(router.routes());
app.use(koaBody());

export default app;

import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import koaBody from 'koa-body';
import koaCors from '@koa/cors';
import router from 'api/router';
import logger from 'middleware/logger';
import locale from 'middleware/locale';
import jwt from 'middleware/jwt';
import websocket from './websocket';

dotenv.config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const app = new Koa();

app.use(logger());
app.use(koaCors({
  origin: '*',
}));
app.use(locale);
app.use(jwt);
app.use(koaBody({
  multipart: true,
}));
app.use(router.routes());
app.use(serve(path.resolve(__dirname, '..', 'public')));

const server = http.createServer(app.callback());
websocket(server);
server.listen(8000);
server.timeout = 60 * 10 * 1000;

export default server;

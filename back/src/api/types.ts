import Koa from 'koa';

export type Controller = (ctx: Koa.Context) => void;

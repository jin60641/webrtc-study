import Koa from 'koa';
  
export interface Controller {
  [key: string]: (ctx: Koa.Context) => void;
}

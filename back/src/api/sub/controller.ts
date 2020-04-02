import { Controller } from 'api/types';

const controller: Controller = {};

controller.test = async ctx => {
  ctx.status = 200;
  ctx.body = 'test';
};

export default controller;

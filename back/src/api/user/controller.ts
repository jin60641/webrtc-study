import {
  Controller,
} from 'api/types';
import db from 'models';

import {
  createUserResponse,
} from './utils';

export const signUp: Controller = async (ctx) => {
  try {
    const user = await db.User.localRegister(ctx.request.body);
    ctx.status = 200;
    ctx.body = await createUserResponse(user);
  } catch (e) {
    ctx.status = 400;
    ctx.body = e.message;
  }
};

export const signIn: Controller = async (ctx) => {
  const {
    email, password,
  } = ctx.request.body;
  const [user] = await db.User.find({
    email,
  });

  if (user && user.comparePassword(password)) {
    ctx.body = await createUserResponse(user);
    ctx.status = 200;
  } else {
    ctx.body = 'not find';
    ctx.status = 404;
  }
};

import {
  Controller,
} from 'api/types';
import db from 'models';
import {
  broadcastMessage,
} from 'utils/socket';

export const getPosts: Controller = async (ctx) => {
  ctx.body = await db.Post.find({});
  ctx.status = 200;
};

export const postPost: Controller = async (ctx) => {
  const {
    text,
  } = ctx.request.body;
  ctx.body = await db.Post.create({
    text,
    author: ctx.state.user._id,
  });
  await broadcastMessage(ctx.state.socketId, {
    type: 'RECEIVE_POST', payload: ctx.body,
  });
  ctx.status = 200;
};

export const deletePost: Controller = async (ctx) => {
  const {
    id,
  } = ctx.params;
  await db.Post.findByIdAndRemove(id);
  ctx.body = id;
  ctx.status = 200;
};

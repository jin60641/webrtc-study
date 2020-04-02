import {
  Context,
} from 'koa';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export interface JWT {
  _id: mongoose.Types.ObjectId;
  email: string;
}

const option = {
  expiresIn: '7d',
};

const generateToken = (payload: JWT) => new Promise<string>((resolve, reject) => {
  jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    option,
    (error, token) => {
      if (error) reject(error);
      resolve(token);
    },
  );
});

export const decodeJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWT;
  } catch (e) {
    return undefined;
  }
};

export const requireAuth = (ctx: Context, next: () => void) => {
  if (!ctx.state.user) {
    ctx.body = 'Unauthorized';
    ctx.status = 401;
    return null;
  }
  return next();
};

export const requireAdmin = (ctx: Context, next: () => void) => {
  /*
  if (![].includes(ctx.state.user?.email)) {
    ctx.body = 'Unauthorized';
    ctx.status = 401;
    return null;
  }
  */
  return next();
};


export default generateToken;

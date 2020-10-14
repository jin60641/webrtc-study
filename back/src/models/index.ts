import mongoose from 'mongoose';

import User from './user';
import Session from './session';
import App from './app';

const uri = process.env.MONGO_URI!;

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = {
  User,
  Session,
  App,
};

export default db;

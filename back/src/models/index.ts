import mongoose from 'mongoose';

import User from './user';
import Session from './session';

const uri = process.env.MONGO_URI!;

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = {
  User,
  Session,
};

export default db;

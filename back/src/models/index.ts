import mongoose from 'mongoose';

import Session from './Session';

const uri = process.env.MONGO_URI as string;

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = {
  Session,
};

export default db;

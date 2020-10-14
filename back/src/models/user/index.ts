import mongoose, {
  Schema,
} from 'mongoose';
import crypto from 'crypto';
import jwt from 'utils/jwt';

import {
  UserDocument,
  UserModel,
  LocalRegisterPayload,
} from './types';

const uniqueValidator = require('mongoose-unique-validator');

const UserSchema: Schema<UserDocument> = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  name: {
    type: String,
    required: [true, 'can\'t be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  password: String,
  hash: String,
  salt: String,
}, {
  timestamps: true,
});

UserSchema.plugin(uniqueValidator, {
  message: 'is already taken.',
});

UserSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.comparePassword = function comparePassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateToken = async function generateToken() {
  const {
    _id, email,
  } = this;
  const payload = {
    _id, email,
  };
  const token = await jwt(payload);
  return token;
};

UserSchema.statics.localRegister = function localRegister({
  email,
  name,
  password,
}: LocalRegisterPayload) {
  const user = new this({
    email,
    name,
  });
  user.setPassword(password);

  return user.save();
};

const model: UserModel = (mongoose.models.Users as UserModel)
  || mongoose.model<UserDocument, UserModel>('Users', UserSchema);

export default model;

import {
  UserDocument,
} from 'models/user/types';

export const createUserResponse = async (user: UserDocument) => {
  const {
    email, name,
  } = user;
  const token = await user.generateToken();

  return {
    name,
    email,
    token,
  };
};

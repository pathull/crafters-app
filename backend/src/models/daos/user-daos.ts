import UserSchema from '../schemas/user-schema';
import { IUser } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const retrieveUserInfo = async (email: string) => {
  if (email && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    const user = await UserSchema.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  throw new AppErrors({ message: 'Please enter a valid email', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const createNewUser = async (info: IUser) => {
  const { email, bio, username, name } = info;
  if (email && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    const userFound = await retrieveUserInfo(email);
    console.log(userFound);

    if (!userFound) {
      const user = await UserSchema.create({
        email,
        bio,
        username,
        name,
        userPicUrl: '',
        public_picture_id: '',
      });

      return user;
    } else {
      throw new AppErrors({ message: 'User already exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
    }
  }

  throw new AppErrors({ message: 'Please enter a valid email', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

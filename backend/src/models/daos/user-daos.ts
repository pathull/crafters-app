import fs from 'fs-extra';

import UserSchema from '../schemas/user-schema';
import { IUser, IFileImage } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';
import { uploadImage, deleteImage } from '../../services/cloudinary';

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

export const upgradeInfoUser = async (id: string, userInfo: IUser, picture?: IFileImage) => {
  const { name, username, bio } = userInfo;
  if (!isNaN(Number(id))) {
    const user = await UserSchema.findOne({ where: { id } });

    if (user) {
      user.set({ name, username, bio });

      if (picture) {
        const publicId = user.getDataValue('public_picture_id');
        const result = await uploadImage(picture.path, 'users');

        if (publicId) {
          await deleteImage(publicId);
        }

        user.set({
          userPicUrl: result.secure_url,
          public_picture_id: result.public_id,
        });

        await fs.unlink(picture.path);
      }

      await user.save();

      return user;
    } else {
      if (picture) {
        await fs.unlink(picture.path);
      }

      throw new AppErrors({ message: 'User does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
    }
  } else {
    if (picture) {
      await fs.unlink(picture.path);
    }

    throw new AppErrors({ message: 'ID must be a number', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
  }
};

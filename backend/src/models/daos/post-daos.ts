import fs from 'fs-extra';

import PostModels from '../schemas/post-models';

import { uploadImage } from '../../services/cloudinary';
import { IPost, IFileImage } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const addNewPost = async (info: IPost, image: IFileImage) => {
  const { title, description, userEmail } = info;
  if (title && userEmail && image) {
    const result = await uploadImage(image.path, 'posts');

    const newPost = await PostModels.create({
      title,
      description,
      userEmail,
      postPicUrl: result.secure_url,
      public_image_id: result.public_id,
    });

    await fs.unlink(image.path);

    return newPost;
  }

  throw new AppErrors({ message: 'Please filled up all information', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

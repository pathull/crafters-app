import fs from 'fs-extra';

import PostModels from '../schemas/post-models';

import { uploadImage } from '../../services/cloudinary';
import { IPost, IFileImage } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const retrievePostsData = async (email: string) => {
  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    const allPosts = await PostModels.findAll({
      where: {
        userEmail: email,
      },
    });

    return allPosts;
  }

  throw new AppErrors({ message: 'Needs to be an email', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

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

export const retrieveOnePost = async (id: string) => {
  if (!isNaN(Number(id))) {
    const post = await PostModels.findOne({ where: { id } });

    return post;
  }
  throw new AppErrors({ message: 'ID must be a number', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const deleteOnePost = async (idPost: string) => {
  if (!isNaN(Number(idPost))) {
    const deletedPost = await PostModels.destroy({ where: { id: idPost } });

    return deletedPost;
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

import CommentModels from '../schemas/comment-models';
import UserModels from '../schemas/user-schema';

import { IComment } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const getCommentsByPost = async (idPost: string) => {
  if (!isNaN(Number(idPost))) {
    const allComments = await CommentModels.findAll({
      where: { idPost },
      attributes: { exclude: ['idPost', 'idUser'] },
      include: {
        model: UserModels,
        attributes: ['username', 'userPicUrl'],
      },
    });

    return allComments;
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

export const postNewComment = async (info: IComment) => {
  const { comment, idUser, idPost } = info;

  if (!isNaN(Number(idUser)) && !isNaN(Number(idPost)) && comment && comment !== '') {
    const newComment = await CommentModels.create({ comment, idUser: Number(idUser), idPost: Number(idPost) });

    if (newComment) return newComment;
  }

  throw new AppErrors({ message: 'Invalid data from body', httpCode: HttpStatusCode.BAD_REQUEST, code: 4 });
};

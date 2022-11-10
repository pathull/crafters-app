import { Request, Response, NextFunction } from 'express';

import { postNewComment, getCommentsByPost } from '../models/daos/comment-daos';

export const createNewComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await postNewComment(req.body);
    if (comment) return res.status(201).json({ message: 'Success' });
    else res.status(500).json({ message: 'Something went wrong', error: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const retrieveCommentsByPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allComments = await getCommentsByPost(req.params.idPost);
    res.status(200).json(allComments);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

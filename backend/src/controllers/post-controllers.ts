import { Request, Response, NextFunction } from 'express';

import { addNewPost } from '../models/daos/post-daos';

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file && req.body) {
      const post = await addNewPost(req.body, req.file);
      return res.status(201).json(post);
    }

    return res.status(400).json({ message: 'Please filled up the information' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

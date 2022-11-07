import { Request, Response, NextFunction } from 'express';

import { addNewPost, retrievePostsData, retrieveOnePost } from '../models/daos/post-daos';

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.emailUser) {
      const result = await retrievePostsData(req.params.emailUser);

      return res.status(200).json(result);
    }

    return res.status(400).json({ message: 'Please provide a user email' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

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

export const getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await retrieveOnePost(req.params.idPost);

    if (post) return res.status(200).json(post);
    else return res.status(400).json({ message: 'Post does not exist' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

import { Request, Response, NextFunction } from 'express';

export const createNewPost = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(201).json({ message: 'New post created' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

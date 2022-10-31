import { Request, Response, NextFunction } from 'express';

export const mainController = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'Hello World' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

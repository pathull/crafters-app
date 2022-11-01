import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ user: 'Send a fucking user' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;

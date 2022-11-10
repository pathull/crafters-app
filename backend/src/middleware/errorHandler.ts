import { Request, Response, NextFunction } from 'express';
import { AppErrors } from '../helpers/app-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: AppErrors, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: {
      name: err.name || 'Error',
      message: err.message || err.description,
      status: err.status || 500,
      trace: err.stack || err.trace || 'Stack not available',
      code: err.code || -1,
      error: err.error || true,
    },
  });

  //! Second option works but I need to change err:Error
  // if (err instanceof AppErrors) {
  //   res.status(err.status).send({
  //     error: err,
  //   });
  // } else {
  //   res.status(500).json({
  //     error: {
  //       name: err.name || 'Error',
  //       message: err.message,
  //       status: 500,
  //       trace: err.stack || 'Stack not available',
  //       code: -1,
  //     },
  //   });
  // }
};

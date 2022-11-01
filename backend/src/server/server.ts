import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import mainRoutes from '../routes/main-routes';
import userRoutes from '../routes/user-routes';
import { pageNotFound } from '../middleware/pageNotFound';
import { errorHandler } from '../middleware/errorHandler';

const app: Application = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('dev'));

app.use('/', mainRoutes);
app.use('/auth', userRoutes);

app.use('*', pageNotFound);
app.use(errorHandler);

export default app;

import express, { Application } from 'express';
import morgan from 'morgan';

import mainRoutes from '../routes/main-routes';
import { pageNotFound } from '../middleware/pageNotFound';
import { errorHandler } from '../middleware/errorHandler';

const app: Application = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(morgan('dev'));

app.use('/', mainRoutes);

app.use('*', pageNotFound);
app.use(errorHandler);

export default app;

import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(morgan('dev'));

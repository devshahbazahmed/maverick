import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './modules/auth/auth.routes.js';

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/health', (req, res) => {
  return res.status(200).json({
    message: 'Server is running',
  });
});

app.use('/api/v1/auth', authRouter);

export default app;

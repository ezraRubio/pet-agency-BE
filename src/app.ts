import express from 'express';
import cors from 'cors';
import config from './config';
import { ProtectedControllers, UnprotectedControllers } from './context';
import { httpErrorHandler } from './error/http.error.handler';

export const app = express()
  .use(cors())
  .enable("trust proxy")
  .disable('x-powered-by')
  .use(express.json())
  .use("/", UnprotectedControllers)
  .use("/", ProtectedControllers)
  .use(httpErrorHandler)

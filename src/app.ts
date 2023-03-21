import express from 'express';
import cors from 'cors';
import config from './config';
import {  UnprotectedControllers } from './context';
import { httpErrorHandler } from './error/http.error.handler';

export const app = express()
  .use(cors({ origin: config.ALLOWED_ORIGINS }))
  .enable("trust proxy")
  .disable('x-powered-by')
  .use(express.json())
  .use("/", UnprotectedControllers)
  .use(httpErrorHandler)
  // .use("/", ProtectedControllers)

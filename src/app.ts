import express from 'express';
import cors from 'cors';
import config from './config';
import { UnprotectedControllers } from './context';
// import { httpErrorHandler } from './error/http.error.handler';

export const app = express()
  .use(cors({ origin: config.ALLOWED_ORIGINS }))
  // .use("/", UnprotectedControllers)
//   .use(bodyParser.json)
//   .use(httpErrorHandler)

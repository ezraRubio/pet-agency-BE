import express from 'express';
import cors from 'cors';
import config from './config';
import {  UnprotectedControllers, ProtectedControllers } from './context';
import { httpErrorHandler } from './error/http.error.handler';
import { auth } from './auth/auth.middleware';

export const app = express()
  .use(cors())//!remember return this
  .enable("trust proxy")
  .disable('x-powered-by')
  .use(express.json())
  .use("/", UnprotectedControllers)
  .use("/", auth, ProtectedControllers)
  .use(httpErrorHandler)

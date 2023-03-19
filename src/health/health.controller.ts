import {Controller} from "../controller";
import express, {Request, Router} from "express";

export const HEALTH_PATH = "/health";

export class HealthController implements Controller {
  router = Router();

  constructor() {
    this.router.get(HEALTH_PATH, (request: Request, response: express.Response) => response.json({status: "up"}));
  }
}

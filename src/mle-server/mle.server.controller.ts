import { NextFunction, Response, Router, Request } from "express";
import { Controller } from "../controller";
import { MleServerService } from "./mle.server.service";

export class MleServerController implements Controller {
  router = Router();

  constructor(private service: MleServerService) {
    this.router.get(
      "/swift-project/:type",
      (req: Request, res: Response, next: NextFunction) => {
        this.getCodeBasedOnType(req.params.type).then((code) => res.json(code));
      },
    );
  }

  getCodeBasedOnType(type: string) {
    return this.service.getCodeByType(type);
  }
}

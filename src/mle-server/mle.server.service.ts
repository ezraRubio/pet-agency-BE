import config from "../config";

export class MleServerService {
  getCodeByType(type: string): Promise<string> {
    let value: string;

    if (type === "client") {
      value = config.CLIENT_ID;
    } else if (type === "secret") {
      value = config.CLIENT_SECRET;
    } else {
      value = "";
    }

    return Promise.resolve(value);
  }
}

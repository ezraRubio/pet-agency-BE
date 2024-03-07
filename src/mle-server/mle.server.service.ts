import { PermissionsError } from "../error/error.module";
import config from "../config";

interface Credentials {
  clientId: string;
  clientSecret: string;
}

export class MleServerService {
  getCodeByType(type: string): Promise<Credentials> {
    if (type != config.TYPE) throw new PermissionsError();

    const value: Credentials = {
      clientId: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
    };

    return Promise.resolve(value);
  }
}

import { config } from "dotenv";

try {
  config();
} catch (e) {
  console.error("no env", e);
}

const appConfig = {
  PORT: process.env.PORT as string,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS as string,
  URI: process.env.MONGO_URI as string,
  SECRET: process.env.JWT_SECRET as string,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME as string,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY as string,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET as string,
  TEST_DB: process.env.TEST_DB_URI as string,
};

try {
  appConfig.ALLOWED_ORIGINS = JSON.parse(appConfig.ALLOWED_ORIGINS);
} catch (e) {
  console.log(
    `failed to parse ALLOWED_ORIGINS: ${appConfig.ALLOWED_ORIGINS}`,
    e,
  );
}

function envGuard(configObject: typeof appConfig) {
  Object.keys(configObject).forEach((key) => {
    if (configObject[key] === undefined) {
      const errorMessage = `Missing ENV configuration for: "${key}"`;

      const error = new Error(errorMessage);

      console.error(errorMessage, error);
      throw error;
    }
  });

  return configObject;
}

export default envGuard(appConfig);

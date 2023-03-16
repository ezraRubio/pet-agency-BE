import {config} from 'dotenv';

try {
    config();
} catch (e) {
    console.error("no env", e);
}

const appConfig = {
  PORT: process.env.PORT,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  URI: process.env.MONGO_URI,
}

try {
    appConfig.ALLOWED_ORIGINS = JSON.parse(appConfig.ALLOWED_ORIGINS);
} catch (e) {
    console.log(`failed to parse ALLOWED_ORIGINS: ${appConfig.ALLOWED_ORIGINS}`, e);
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

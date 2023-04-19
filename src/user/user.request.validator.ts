import { ErrorCodes } from "../error/error.codes";
import { validatorFactory } from "../utils/validator.utils";
import { credentialsSchema, userSchema } from "./user.request";

export const userCredentialValidation = validatorFactory(ErrorCodes.INVALID_ENTRY, credentialsSchema)
export const userModelValidation = validatorFactory(ErrorCodes.INVALID_ENTRY, userSchema)
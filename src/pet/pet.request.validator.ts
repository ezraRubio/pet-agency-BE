import { ErrorCodes } from "../error/error.codes";
import { validatorFactory } from "../utils/validator.utils";
import { searchSchema } from "./pet.request";

export const searchQueryValidator = validatorFactory(ErrorCodes.INVALID_ENTRY, searchSchema)
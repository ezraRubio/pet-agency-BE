import { ErrorCodes } from "../error/error.codes";
import { validatorFactory } from "../utils/validator.utils";
import { addNewPetSchema, editPetSchema, searchSchema } from "./pet.request";

export const searchQueryValidator = validatorFactory(ErrorCodes.INVALID_ENTRY, searchSchema)
export const addPetValidator = validatorFactory(ErrorCodes.INVALID_ENTRY, addNewPetSchema)
export const editPetValidator = validatorFactory(ErrorCodes.INVALID_ENTRY, editPetSchema)
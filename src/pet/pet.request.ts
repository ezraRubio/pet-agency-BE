import * as yup from "yup";
import { Status, Type } from "./pet.model";

const requiredString = yup.string().trim().required();
const optionalString = yup.string().trim().optional();

export const searchSchema = yup.object({
  query: yup.object({
    type: yup.mixed<Type>().oneOf(Object.values(Type)).optional(),
    name: optionalString,
    status: yup.mixed<Status>().oneOf(Object.values(Status)).optional(),
    height: optionalString,
    weight: optionalString,
  }),
});

export const addNewPetSchema = yup.object({
  body: yup.object({
    type: yup.mixed<Type>().oneOf(Object.values(Type)).required(),
    name: requiredString,
    status: yup.mixed<Status>().oneOf(Object.values(Status)).required(),
    picture: optionalString,
    pictureId: optionalString,
    height: yup.number().optional(),
    weight: yup.number().optional(),
    color: optionalString,
    bio: optionalString,
    hypoallergenic: yup.boolean().optional(),
    diet: yup.array(optionalString).optional(),
    breed: optionalString,
  }),
});

export const editPetSchema = yup.object({
  body: yup
    .object({
      ...addNewPetSchema.fields,
      type: yup.mixed<Type>().oneOf(Object.values(Type)),
      name: optionalString,
      status: yup.mixed<Status>().oneOf(Object.values(Status)),
    })
    .required(),
});

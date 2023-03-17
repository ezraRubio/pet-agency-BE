import * as yup from "yup";
import { Status, Type } from "./pet.model";

//TODO: make better validation
export const searchSchema = yup.object({
    query: yup.object({
        type: yup.mixed<Type>().oneOf(Object.values(Type)).optional(),
        name: yup.string().trim().optional(),
        status: yup.mixed<Status>().oneOf(Object.values(Status)).optional(),
        height: yup.number().positive().optional(),
        weight: yup.number().positive().optional(),
    })
})
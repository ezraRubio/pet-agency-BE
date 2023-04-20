import * as yup from "yup";
import { optionalString, requiredString } from "../utils/validator.utils";

const emailRegex =
  /^([a-zA-Z0-9_\-\.+!=]+)@([a-zA-Z0-9_\-]+\.(com|org|net|edu|gov|mil|biz|info|name|museum|coop|[a-zA-Z]{2,}))(?:\.[a-zA-Z]{2,})?$/i;

export const credentialsSchema = yup.object({
  body: yup.object({
    email: requiredString.matches(emailRegex, "Invalid email format"),
    password: requiredString.min(6, "Password needs to have minium of 6 characters"),
  }),
});

export const userSchema = yup.object({
    body: yup.object({
        firstName: optionalString.max(20),
        lastName: optionalString.max(20),
        phone: optionalString.max(10),
        bio: optionalString.max(200),
    })
});

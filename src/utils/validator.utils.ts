import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import {
  SchemaValidationError,
  UnprocessableDataError,
} from "../error/error.module";
import {ErrorCodes} from "../error/error.codes";
import { ErrorType } from "../error/error.types";

function getStructuredValidationError(
  errorCode: ErrorCodes,
  error: yup.ValidationError
): UnprocessableDataError {
  return new UnprocessableDataError(
    errorCode,
    "validation_error",
    400,
    ErrorType.INVALID_ENTRY,
    error.inner.map((validationError) => mapValidationErrors(validationError))
  );
}

function mapValidationErrors(error): SchemaValidationError {
  return {
    key: error.message,
    path: error.path,
    value: error.value,
  };
}

export function validatorFactory(
  errorCode: ErrorCodes,
  schema: yup.ObjectSchema<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    return schema
      .validate(
        { body: req.body, query: req.query, params: req.params },
        {
          abortEarly: false,
          strict: true,
        }
      )
      .then(() => {
        next();
      })
      .catch((err: yup.ValidationError) => {
        const appError = getStructuredValidationError(errorCode, err);
        next(appError);
      });
  };
}

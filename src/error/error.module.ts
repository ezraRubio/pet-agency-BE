import { ErrorCodes } from "./error.codes";
import { ErrorType } from "./error.types";

export interface SchemaValidationError {
  key: string;
  path: string;
  value: string;
}

export class AppError extends Error {
  status = 500;
  code = ErrorCodes.INTERNAL_SERVER_ERROR;
  type?: ErrorType;
  details?: unknown;
  errors?: SchemaValidationError[];
}

export class UnprocessableDataError extends AppError {
  constructor(
    public code: ErrorCodes,
    public details: unknown,
    public status: number,
    public type: ErrorType,
    public errors?: SchemaValidationError[]
  ) {
    super();
  }
}

export class DuplicateEntryError extends AppError {
  code = ErrorCodes.DUPLICATE_DATA;
  status = 409;
  type = ErrorType.DUPLICATE_DATA;
  constructor() {
    super();
  }
}

export class NotFoundError extends AppError {
  status = 404;
  constructor(public code: ErrorCodes, public type: ErrorType) {
    super();
  }
}

export class PermissionsError extends AppError {
  status = 403
  code = ErrorCodes.PERMISSION_REQUIRED;
  type = ErrorType.FORBIDDEN

  constructor() {
    super("Access forbidden");
  }
}

export class UnauthorizedError extends AppError {
  status = 401
  code = ErrorCodes.UNAUTHORIZED
  type = ErrorType.UNAUTHORIZED

  constructor () { 
    super ("Not authorized")
  }
}
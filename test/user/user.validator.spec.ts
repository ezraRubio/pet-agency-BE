import { Request, Response, NextFunction } from "express";
import { randomString } from "../utils";
import { ErrorCodes } from "../../src/error/error.codes";
import { userCredentialValidation, userModelValidation } from "../../src/user/user.request.validator";
import { mockUser } from "./utils";

describe("user validation middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  describe("new user validation", () => {
    it("should fail if missing required fields", async () => {
      mockRequest = { body: { password: randomString } };

      await userCredentialValidation(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith(
        expect.objectContaining({
          code: ErrorCodes.INVALID_ENTRY,
        })
      );
    });

    it("should fail if email is not formatted correctly", async () => {
        mockRequest = { body: { email: randomString, password: randomString } };

        await userCredentialValidation(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction
        );
  
        expect(nextFunction).toBeCalledTimes(1);
        expect(nextFunction).toBeCalledWith(
          expect.objectContaining({
            code: ErrorCodes.INVALID_ENTRY,
          })
        );  
    });
  });

  describe("edit user validation", () => {
    it("should fail if the name is too long of a string", async () => {
      mockRequest = {body: {...mockUser, firstName: randomString+randomString}}

      await userModelValidation(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith(
        expect.objectContaining({
          code: ErrorCodes.INVALID_ENTRY,
        })
      );
    });

    it("should fail if the last name is too long of a string", async () => {
      mockRequest = {body: {...mockUser, lastName: randomString+randomString}}

      await userModelValidation(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith(
        expect.objectContaining({
          code: ErrorCodes.INVALID_ENTRY,
        })
      );
    });

    it("should fail if phone number not formatted properly", async () => {
      mockRequest = {body: {...mockUser, phone: randomString}}

      await userModelValidation(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith(
        expect.objectContaining({
          code: ErrorCodes.INVALID_ENTRY,
        })
      );
    });

    it("should pass all validations", async () => {
      mockRequest = {body: mockUser}

      await userModelValidation(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      )
      
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith(
        expect.objectContaining({
          code: ErrorCodes.INVALID_ENTRY,
        })
      );
    })
  });
});

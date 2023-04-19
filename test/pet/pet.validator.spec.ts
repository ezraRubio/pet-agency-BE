import { NextFunction, Request, Response } from "express";
import { mockPet } from "./utils";
import { randomString } from "../utils"
import {
  addPetValidator,
  editPetValidator,
  searchQueryValidator,
} from "../../src/pet/pet.request.validator";
import { ErrorCodes } from "../../src/error/error.codes";

describe("pet validation middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  describe("search validation", () => {
    it("should pass search validation", async () => {
      mockRequest = { query: mockPet };

      await searchQueryValidator(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith();
    });

    it("should fail if searching for a not allowed type", async () => {
      mockRequest = { query: { type: randomString } };

      await searchQueryValidator(
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

    it("should fail if searching for a not allowed status", async () => {
      mockRequest = { query: { status: randomString } };

      await searchQueryValidator(
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

    it("should pass search validation with an empty query", async () => {
      mockRequest = { query: {} };

      await searchQueryValidator(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith();
    });
  });

  describe("add pet validation", () => {
    it("should fail if missing one of the required parameters", async () => {
      mockRequest = { body: { name: randomString } };

      await addPetValidator(
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

    it("should pass if body includes minimum requirements", async () => {
      mockRequest = { body: mockPet };

      await searchQueryValidator(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith();
    });
  });

  describe("edit pet validator", () => {
    it("should fail if changing to invalid type", async () => {
      mockRequest = { body: { type: randomString } };

      await editPetValidator(
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

    it("should fail if changing to invalid status", async () => {
      mockRequest = { body: { status: randomString } };

      await editPetValidator(
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

    it("should fail if empty body", async () => {
      await editPetValidator(
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

    it("should pass if a least one correct parameter is right", async () => {
      mockRequest = { body: { status: "Fostered" } };

      await editPetValidator(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
      expect(nextFunction).toBeCalledTimes(1);
      expect(nextFunction).toBeCalledWith();
    });
  });
});

import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import jwt from "jsonwebtoken";
import config from "../config";
import { Role } from "../auth/roles";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {
  AppError,
  NotFoundError,
  UnauthorizedError,
} from "../error/error.module";
import { ErrorCodes } from "../error/error.codes";
import { DuplicateEntryError } from "../error/error.module";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  logIn = async (credentials: User): Promise<{token:string, role:Role, uid:string}> => {
    const foundUser = await this.userRepository.findOneUser({
      email: credentials.email,
    });
    if (!foundUser) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);

    const doPasswordsMatch = await bcrypt.compare(
      credentials.password,
      foundUser.password
    );
    if (!doPasswordsMatch) throw new UnauthorizedError();

    const token = jwt.sign(
      { role: foundUser.role, uid: foundUser.id },
      config.SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {token, role: foundUser.role, uid: foundUser.id};
  };

  signUp = async (credentials: User): Promise<{token:string, role:Role, uid:string}> => {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newUser: User = {
      email: credentials.email,
      password: hashedPassword,
      id: uuid(),
      role: Role.CLIENT,
    };

    const isInserted = await this.userRepository.addNewUser(newUser);
    if (!isInserted) throw new AppError("ups, something happened");

    const token = jwt.sign(
      {
        role: newUser.role,
        uid: newUser.id,
      },
      config.SECRET,
      { expiresIn: "1h" }
    );

    return {token, role: newUser.role, uid: newUser.id};
  };

  updatePassword = async (
    uid: string,
    newPassword: string
  ): Promise<string> => {
    const foundUser = await this.userRepository.findOneUser({ id: uid }, true);
    if (!foundUser) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);

    const doPasswordsMatch = await bcrypt.compare(
      newPassword,
      foundUser.password
    );
    if (doPasswordsMatch) throw new DuplicateEntryError();

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.userRepository.updateOneUser(
      { id: uid },
      { password: newHashedPassword }
    );

    const token = jwt.sign(
      { role: updatedUser.role, uid: updatedUser.id },
      config.SECRET,
      { expiresIn: "1h" }
    );

    return token;
  };

  updateUser = async (uid: string, data: Partial<User>): Promise<User> => {
    const updatedUser = await this.userRepository.updateOneUser(
      { id: uid },
      data
    );

    if (!updatedUser) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);

    return updatedUser;
  };

  getSingleUser = async (id: string): Promise<User> => {
    const foundUser = await this.userRepository.findOneUser({ id });

    if (!foundUser) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);

    return foundUser;
  };

  deleteUser = async (id: string): Promise<boolean> => {
    const isDeleted = await this.userRepository.removeOneUser({ id });

    if (!isDeleted) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);

    return !!isDeleted;
  };
}

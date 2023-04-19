import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import jwt from "jsonwebtoken";
import config from "../config";
import { Role } from "../auth/roles";
import * as bcrypt from "bcrypt";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    logIn(user:User): Promise<any> {
        user.role = Role.CLIENT
        user.id = "123"
        const token = jwt.sign({role:user.role, uid:user.id}, config.SECRET, {expiresIn: "1h"})
        console.log("token", token)
        return Promise.resolve(token)
    }

    signUp(credentials:User): Promise<any> {
        console.log(credentials)
        const hashedPassword = bcrypt.hash(credentials.password, 10).then(hashed=>hashed)
        return Promise.resolve()
    }
}
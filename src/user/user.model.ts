import { ObjectId } from "mongodb";
import { Role } from "../auth/roles";

export interface User {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: Role;
    bio?: string;
    savedPets?: ObjectId[];
    adoptedPets?: ObjectId[];
}

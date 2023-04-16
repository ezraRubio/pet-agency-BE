import { Role } from "src/auth/roles";
import { Pet } from "src/pet/pet.model";

export interface User {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: Role;
    bio?: string;
    savedPets?: Pet[];
    adoptedPets?: Pet[];
}
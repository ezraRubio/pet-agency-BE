import { Role } from "../auth/roles";
import { Pet } from "../pet/pet.model";

export interface User {
    id: string;
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

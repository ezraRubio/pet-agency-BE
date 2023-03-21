import { Pet, Status, Type } from "./pet.model";
import { Pet, Status, Type } from "./pet.model";

export interface SearchDTO { 
    type?: Type,
    name?: string,
    status?: Status,
    height?: string | number,
    weight?: string | number,
}
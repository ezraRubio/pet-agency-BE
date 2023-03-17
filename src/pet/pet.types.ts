import { Pet, Status, Type } from "./pet.model";

export interface SearchDTO extends Partial<Pet> { 
    type?: Type,
    name?: string,
    status?: Status,
    height?: number,
    weight?: number,
}
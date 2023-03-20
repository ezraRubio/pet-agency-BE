import { Pet, Status, Type } from "../../src/pet/pet.model";
import {v4 as uuid} from "uuid"

export const expectedPets: Pet[] = [
  { id: "1", name: "Fluffy", type: Type.CAT, status: Status.ADOPTED },
  { id: "2", name: "Fluffs", type: Type.DOG, status: Status.AVAILABLE },
];

export const aPet: Pet = {
  id: uuid(),
  type: Type.DOG,
  status: Status.AVAILABLE,
  name: "FluffX"
} 

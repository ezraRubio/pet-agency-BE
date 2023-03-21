import { Pet, Status, Type } from "../../src/pet/pet.model";
import { v4 as uuid } from "uuid";

export const randomString = Math.random().toString(36).substring(2);

export const expectedPets: Pet[] = [
  {
    id: "1",
    name: "Fluffy",
    type: Type.CAT,
    status: Status.ADOPTED,
    height: 84,
  },
  {
    id: "2",
    name: "Fluffs",
    type: Type.DOG,
    status: Status.AVAILABLE,
    weight: 65,
  },
];

export const aPet: Pet = {
  id: uuid(),
  type: Type.DOG,
  status: Status.AVAILABLE,
  name: "FluffX",
};

export const mockPet = {
  type: "Cat",
  name: randomString,
  status: "Available",
};

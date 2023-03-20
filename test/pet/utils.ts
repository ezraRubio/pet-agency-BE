import { Pet, Status, Type } from "../../src/pet/pet.model";

export const expectedPets: Pet[] = [
  { id: "1", name: "Fluffy", type: Type.CAT, status: Status.ADOPTED },
  { id: "2", name: "Fluffs", type: Type.DOG, status: Status.AVAILABLE },
];

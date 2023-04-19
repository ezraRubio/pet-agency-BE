import { randomString, generateRandomNumber } from "../utils";

export const mockUser = {
    firstName: randomString,
    lastName: randomString,
    phone: generateRandomNumber(10),
    bio: randomString,
}
export interface Pet {
    type: Type,
    name: string,
    status: Status,
    picture?: string,
    pictureId?: string,
    height?: number,
    weight?: number,
    color?: string,
    bio?: string,
    hypoallergenic?: boolean,
    diet?: string[],
    breed?: string,
}

export enum Status {
    AVAILABLE = "Available", 
    ADOPTED = "Adopted", 
    FOSTERED = "Fostered",
}

export enum Type {
    CAT = "Cat",
    DOG = "Dog",
}
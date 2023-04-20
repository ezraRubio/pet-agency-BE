export enum Role {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT",
  }
  
  export enum Permission {
    CREATE_PET = "CREATE_PET",
    UPDATE_PET = "UPDATE_PET",
    DELETE_PET = "DELETE_PET",
    GET_PET = "GET_PET",
  }
  
  export const roleToPermissions = {
    [Role.ADMIN]: [
      Permission.CREATE_PET,
      Permission.UPDATE_PET,
      Permission.DELETE_PET,
      Permission.GET_PET,
    ],
    [Role.CLIENT]: [
      Permission.GET_PET,
    ]
  };
  
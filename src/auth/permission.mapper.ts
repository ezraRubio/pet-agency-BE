import { Role, roleToPermissions } from "./roles";

export const mapRolesToPermissions = (roles: Role[]) => {
  const permissions = roles
    .map((role) => roleToPermissions[role])
    .filter(Boolean);

  return Array.from(new Set(permissions.flat()));
};

export const RoleNames = ["super_admin", "vendor", "customer"] as const;
export type RoleName = (typeof RoleNames)[number];

export const Roles = {
  SUPER_ADMIN: RoleNames[0],
  VENDOR: RoleNames[1],
  CUSTOMER: RoleNames[2],
} as const;

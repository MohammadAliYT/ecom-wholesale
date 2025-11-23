import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number().optional(),
  name: z.enum(["super_admin", "vendor", "customer"]),
  description: z.string().optional(),
});

export type Role = z.infer<typeof RoleSchema>;

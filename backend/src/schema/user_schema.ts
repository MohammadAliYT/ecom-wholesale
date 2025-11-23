import { z } from "zod";

//Zod schema for runtime validation
export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role_id: z.number().int(),
  created_at: z.date().optional(),
});

//TypeScript type inferred automatically
export type User = z.infer<typeof UserSchema>;

//Partial schemas (useful for login, updates)
export const UserLoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const UserRegisterSchema = UserSchema.omit({
  id: true,
  created_at: true,
});

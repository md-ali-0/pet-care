import { object, string } from "zod";

export const profileUpdateSchema = object({
  name: string({ required_error: "Name is required" }),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  address: string({ required_error: "Address is required" }).optional(),
  phone: string({ required_error: "Phone is required" }).optional(),
  bio: string({ required_error: "Bio is required" }).optional(),
});

import * as z from "zod";

export const LoginSchema = z.object({
  mobile: z.string().min(10,{ message: "mobile is required" }),
  // password: z.string().min(1, { message: "Password is required" }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

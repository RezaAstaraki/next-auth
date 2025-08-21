import * as z from "zod";

export const LoginSchema = z.object({
  mobile: z.string().min(10, { message: "mobile is required" }),
  captcha: z.string().min(5, { message: "code is required" }),
  cpCode: z.string({ message: "cp code does not exist" }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const otpSchema = z.object({ otp: z.string() });
export type OtpSchemaType = z.infer<typeof otpSchema>;

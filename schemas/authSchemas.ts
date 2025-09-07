import * as z from "zod";

export const LoginSchema = z.object({
  mobile: z.string().min(10, { message: "mobile is required" }),
  captcha: z.string().min(5, { message: "code is required" }),
  cpCode: z.string({ message: "cp code does not exist" }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const otpSchema = z.object({
  code: z.string().min(6, "کد باید شامل 6 کارکتر باشد"),
});
export type OtpSchemaType = z.infer<typeof otpSchema>;

export const sendMobileSchema = z.object({
  mobile: z
    .string({ message: "شماره موبایل نمی‌تواند خالی باشد" })
    .min(1, { message: "شماره موبایل نمی‌تواند خالی باشد" })
    .regex(/^09\d{9}$/, {
      message: "شماره موبایل باید یک شماره معتبر باشد. مانند 09121234567 ",
    }),
});
export type MobileSchemaType = z.infer<typeof sendMobileSchema>;

export const AuthWithOTPRequestSchema = z.object({
  request_id: z.string({message:'لازم است request_id'}).min(1, { message: "request_id نمی تواند خالی باشد" }),
  mobile: sendMobileSchema.shape.mobile,
  code: otpSchema.shape.code,
  device_id: z.string().optional(),
});

export type AuthWithOTPRequestSchemaType = z.infer<
  typeof AuthWithOTPRequestSchema
>;




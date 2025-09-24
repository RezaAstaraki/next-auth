import * as z from "zod";



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

export const GenderSchema = z.union([
  z.object({
    id: z.literal(1),
    title: z.literal("male"),
  }),
  z.object({
    id: z.literal(2),
    title: z.literal("female"),
  }),
]);


const ListRoleResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const UserSchema = z.object({
  id: z.number().int(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  mobile: z.string().nullable(),
  email: z.string().nullable(),
  national_code: z.string().nullable(),
  postal_code: z.string().nullable(),
  roles: z.array(ListRoleResourceSchema),
  verified_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
});

export type User = z.infer<typeof UserSchema>;
export type ListRoleResource = z.infer<typeof ListRoleResourceSchema>;

export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, "نام نمیتواند خالی باشد")
    .max(255, "حداکثر طول 255 کاراکتر است"),

  last_name: z
    .string()
    .min(1, "نام خانوادگی نمیتواند خالی باشد")
    .max(255, "حداکثر طول 255 کاراکتر است"),

  email: z
    .string()
    .email("ایمیل معتبر نیست")
    .max(255, "حداکثر طول 255 کاراکتر است")
    .nullable(),

  national_code: z.string().length(10, "تعداد ارقام کد ملی باید 10 رقم است").optional(),

  postal_code: z.string().length(10, "تعداد ارقام کد پستی باید 10 رقم است").or(z.literal("")).nullable(),
});
export type UpdateProfileSchemaType =z.infer<typeof updateProfileSchema>

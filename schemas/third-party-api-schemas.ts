import { z } from "zod";

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

  national_code: z.string().max(255, "حداکثر طول 255 کاراکتر است").nullable(),

  postal_code: z.string().max(255, "حداکثر طول 255 کاراکتر است").nullable(),
});
export type UpdateProfileSchemaType =z.infer<typeof updateProfileSchema>

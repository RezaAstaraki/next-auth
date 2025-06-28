import { z } from 'zod';

export interface PaymentOption {
    id: number;
    type: {
        id: number;
        title: string;
    };
    amount: number;
}

export interface Benefit {
    id: number;
    name: string;
    label: string;
}

export interface PlanData {
    id: number;
    name: string;
    description?: string;
    investment_amount: number;
    estimated_yield: number;
    payment_options: PaymentOption[];
    benefits: Benefit[];
}

export interface PlanCardProps {
    planData: Plan;
    type: string;
    isSelected: boolean;
    isPopular?: boolean;
    onClick: () => void;
}

export const SignInFormSchema = z.object({
    mobile: z
        .string()
        .min(1, 'شماره موبایل الزامی است')
        .regex(/^09[0-9۰-۹]{9}$/, 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد'),
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;

export const VerificationSchema = z.object({
    code: z.string({ message: 'کد تایید را وارد کنید ' }).length(6, 'کد باید ۶ رقم باشد'),
});

export type VerificationData = z.infer<typeof VerificationSchema>;

export const UserInfoSchema = z.object({
    first_name: z
        .string({ message: 'نام نمی‌تواند خالی باشد' })
        .max(255, { message: 'نام نباید بیشتر از 255 کاراکتر باشد' })
        .min(1, { message: 'نام نمی‌تواند خالی باشد' }),
    last_name: z
        .string({ message: 'نام خانوادگی نمی‌تواند خالی باشد' })
        .max(255, { message: 'نام خانوادگی نباید بیشتر از 255 کاراکتر باشد' })
        .min(1, { message: 'نام خانوادگی نمی‌تواند خالی باشد' }),
    birthday: z.string({ message: 'تاریخ تولد نمی‌تواند خالی باشد' }).min(1, { message: 'تاریخ تولد نمی‌تواند خالی باشد' }),
    national_code: z.string({ message: 'کد ملی نمی‌تواند خالی باشد' }).min(1, { message: 'کد ملی نمی‌تواند خالی باشد' }).optional(),
    gender: z.enum(['1', '2'], {
        message: 'جنسیت باید یکی از مقادیر مرد یا زن باشد',
    }),
    iban: z.string().min(1, { message: 'شماره شبا نمی‌تواند خالی باشد' }),
    address: z.string({ message: 'آدرس نمی‌تواند خالی باشد' }).min(1, { message: 'آدرس نمی‌تواند خالی باشد' }),
    postal_code: z.string({ message: 'کد پستی نمی‌تواند خالی باشد' }).min(1, { message: 'کد پستی نمی‌تواند خالی باشد' }),
});

export type TUserInfo = z.infer<typeof UserInfoSchema>;

export interface PaymentOptionType {
    id: number;
    title: string;
}

export interface PaymentOption {
    id: number;
    type: PaymentOptionType;
}

export interface InstallmentData {
    id: number;
    step: number;
    installment_amount: number;
    total_amount: number;
    status: Status;
    due_date: string;
    plan: Plan;
    user_plan_id?: number;
}

export interface QuantityStepProps {
    onBack?: () => void;
    onSubmit: (data: any) => void;
}

export interface UserForm {
    id: string;
    first_name: string;
    last_name: string;
    national_code: string;
    mobile: string;
    errors: Record<string, string>;
}

export interface InstallmentResponse {
    data: Installment[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface Installment {
    id: number;
    step: number;
    installment_amount: number;
    total_amount: number;
    status: Status;
    due_date: string;
    user_plan: UserPlan;
}

export interface UserPlan {
    id: number;
    quantity: number;
    total_amount: number;
    status: Status;
    plan: Plan;
    payment_option: PaymentOption;
    created_at: string;
    updated_at: string;
}

export interface Plan {
    id: string;
    name: string;
    investment_amount: number;
    estimated_yield: number;
    duration?: string;
    benefits?: { id: number; label: string }[];
    description?: string;
}

export interface Status {
    id: number;
    title: string;
}

export interface PaymentOption {
    id: number;
    type: {
        id: number;
        title: string;
    };
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PageLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PageLink {
    url: string | null;
    label: string;
    active: boolean;
}

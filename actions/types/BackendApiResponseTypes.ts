export type UserType = {
  id: number;
  last_name: string | null;
  mobile: string | null;
  email: string | null;
  national_code: string | null;
  birthday: string;
  gender: GenderType;
  postal_code: string | null;
  address: string | null;
  iban: string | null;
  verified_at: string;
};

type GenderType = { id: 1; title: "male" } | { id: 2; title: "female" };

export type VerifyOtpResponseType = {
  user: string;
  token: string;
  token_type: string;
  action: string;
};

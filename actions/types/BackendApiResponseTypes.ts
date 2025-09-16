import { User } from "@/schemas/authSchemas";

export type VerifyOtpResponseType = {
  user: User;
  token: string;
  token_type: string;
  action: string;
};
export type VerifyOtpResponseJwtType = {
  token_type: "Bearer";
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

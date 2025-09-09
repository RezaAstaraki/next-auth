import { User } from "@/schemas/authSchemas";

export type VerifyOtpResponseType = {
  user: User;
  token: string;
  token_type: string;
  action: string;
};




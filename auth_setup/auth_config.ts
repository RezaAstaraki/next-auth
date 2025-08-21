import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "otp",
      credentials: {
        username: { label: "OTP CODE " },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials in auth config", credentials);
        // return {user:credentials.username}in
        return { id: "1", name: "test", email: "dd", hh: "custom" };

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

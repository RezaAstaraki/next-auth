import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Your custom field */
      address?: string;
      cunstom?: string;
      myProperty?: string;
    } & DefaultSession["user"]; // Keep default user properties
  }

  interface User {
    myProperty?: string;
  }
}

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "otp",
      credentials: {
        otpCode: { label: "OTP CODE " },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials in auth config", credentials);
        // return {user:credentials.username}in
        if (credentials.otpCode === "1234") {
          return {
            id: "1",
            name: "test",
            email: "dd",
            myProperty: "custom in user",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session }) => {
      token["cunstom"] = "cccc";
      // console.log("token in jwt call back", JSON.stringify(token, null, 2));
      if (user) {
        // console.log("------------------", ">>>>>>>>>>>>");
        token["myProperty"] = user.myProperty;
      }
      token["justinjwt"] = "just in jwt ";
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.cunstom) {
        session.user["cunstom"] = token.cunstom as string;
      }
      if (token?.myProperty) {
        session.user.myProperty = token.myProperty as string;
      }
      console.log("session in call back", JSON.stringify(session, null, 2));

      return session;
    },
  },
} satisfies NextAuthConfig;

import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials in auth config", credentials);
        // return {user:credentials.username}

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { DefaultSession } from "next-auth";
import { User } from "@/schemas/authSchemas";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"]; // Keep default user properties
  }
}

type OtpCredentials = {
  user: {
    mobile: string | null;
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    national_code: string | null;
    birthday: string;
    gender:
      | {
          id: 1;
          title: "male";
        }
      | {
          id: 2;
          title: "female";
        };
    postal_code: string | null;
    address: string | null;
    iban: string | null;
    verified_at: string | null;
  };
  action: string;
  token: string;
  token_type: string;
};

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    
    Credentials({
      id: "otp",
      // credentials: {
      //   user:User,
      //   token:string,
      //   action :string,
      //   token_type:string

      // },

      async authorize(credentials: any) {
        if (!credentials) return null;

        const user = JSON.parse(credentials.user);

        console.log("user in authorize", user);

        // fix roles
        let roles: any[] = [];
        try {
          roles = JSON.parse(String(credentials.roles ?? "[]"));
        } catch {
          roles = [];
        }
        console.log("credentials in authorize", credentials);

        // return { ...user, roles ,id:user.id };
        return { id: String(user.id), ...user, token: credentials.token };
      },
    }),
    

  ],
  callbacks: {
    jwt: async ({ token, user, session }) => {
      if (user) {
        //   token['user']=user
        // token['id'] = user.id;
        token["user"] = user;
      }

      console.log("------------------jwt call back ---------------------");
      console.log("token in JWT call back", token);
      console.log("user in JWT call back", user);
      console.log("session in JWT call back", session);
      console.log("------------------jwt call back End ---------------------");

      return token;
    },
    session: async ({ session, token, user }) => {
      if (session.user) {
        // session.user["id"] = token.sub as string;
        // session.user["first_name"] = token.user.first_name as string;
        // session.user["last_name"] = token.user.last_name as string;
        // session.user["mobile"] = token.user.mobile as string;
        // session.user["email"] = token.user.email as string;
        // session.user["national_code"] = token.user.national_code as string;
        // session.user["gender"] = token.user.gender;
        // session.user["roles"] = JSON.parse(token.user.roles) as string;
        // session.user["verified_at"] = token.user.verified_at;
        // session.user["created_at"] = token.user.created_at as string;
        // session.user["callbackUrl"] = token.user.callbackUrl as string;
      }

      console.log("------------------SESSION call back ---------------------");
      console.log("token in SESSION call back", token);
      console.log("user in SESSION call back", user);
      console.log("session in SESSION call back", session);
      console.log(
        "------------------SESSION call back End ---------------------"
      );


      return session;
    },

  },
} satisfies NextAuthConfig;

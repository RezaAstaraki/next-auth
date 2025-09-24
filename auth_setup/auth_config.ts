import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { DefaultSession } from "next-auth";
import { User } from "@/schemas/authSchemas";
import { JWTType, refreshTokens } from "@/actions/authActions";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
    error?: "RefreshTokenError";
    exp: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
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
    //--------------------simple version-----------------------//
    // Credentials({
    //   id: "otp",
    //   async authorize(credentials: any) {
    //     if (!credentials) return null;
    //     const user = JSON.parse(credentials.user);
    //     let roles: any[] = [];
    //     try {
    //       roles = JSON.parse(String(credentials.roles ?? "[]"));
    //     } catch {
    //       roles = [];
    //     }
    //     return { id: String(user.id), ...user, token: credentials };
    //   },
    // }),

    //----------------------------jwt version------------------------------
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

        // fix roles
        let roles: any[] = [];
        try {
          roles = JSON.parse(String(credentials.roles ?? "[]"));
        } catch {
          roles = [];
        }
        // return { ...user, roles ,id:user.id };
        return {
          id: String(user.id),
          ...user,
          accessTokenExpiration: credentials.accessTokenExpiration,
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,

        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, account, trigger }) => {
      if (user) {
        token["user"] = user;
      }

      let manualTrigger;
      let myUser: any = token.user;
      const expAccessToken = Number(myUser.accessTokenExpiration);
      if (myUser) {
        if (expAccessToken < Date.now() / 1000) {
          manualTrigger = true;
        }
      }
      if (trigger === "update" || !!manualTrigger) {
        const res = await refreshTokens(myUser.refreshToken);
        if (res.ok) {
          const newDecodedAccessToken: JWTType = jwtDecode(
            res.body.access_token
          );
          myUser = newDecodedAccessToken.user;
          myUser.refreshToken = res.body.refresh_token;
          myUser.accessToken = res.body.access_token;
          myUser.accessTokenExpiration =
            newDecodedAccessToken.exp -
            Number(process.env.NEXT_PUBLIC_SECONDS_TO_REDUCE ?? 0);

          // myUser.accessTokenExpiration=newDecodedAccessToken.exp
          // myUser.created_at=newDecodedAccessToken.user.verified_at
          // myUser.first_name=newDecodedAccessToken.user.first_name
          // myUser.last_name=newDecodedAccessToken.user.last_name
          // myUser.id=newDecodedAccessToken.user.id
          // myUser.created_at=newDecodedAccessToken.user.created_at
          // myUser.email=newDecodedAccessToken.user.email
          // myUser.mobile=newDecodedAccessToken.user.mobile
          // myUser.national_code=newDecodedAccessToken.user.national_code
          // myUser.=newDecodedAccessToken.user.national_code

          token["user"] = myUser;
        } else {
          console.error("error in refresh", res.message);
          (token as any).error = "RefreshTokenInvalid";
        }
      }

      // if(Date.now()>token.user.accessTokenExpiration){
      //   const newTokens = await refreshTokens(token.user.refreshToken)
      //   if(newTokens.ok){
      //     token['user']['accessToken']=newTokens.body.access_token
      //     token['user']['refreshToken:']=newTokens.body.refresh_token
      //   }
      // }



      return token;
    },
    session: async ({ session, token, user, trigger }) => {
      session.error = token.error;
      const receivedToken: any = token.user;
      if (session.user) {
        
        session.exp = receivedToken.accessTokenExpiration;
        // session.user.id = receivedToken.id as number
      }
        session.user.mobile=receivedToken.mobile
        session.user.verified_at=receivedToken.verified_at
        session.user.roles=receivedToken.roles
        session.user.created_at=receivedToken.created_at
        // session.user.national_code=receivedToken.national_code
        // session.user.first_name=receivedToken.first_name
        // session.user.last_name=receivedToken.last_name


      return session;
    },
  },
} satisfies NextAuthConfig;

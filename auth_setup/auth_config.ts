import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { DefaultSession } from "next-auth";
import { User } from "@/schemas/authSchemas";
import { JWTType, refreshTokens } from "@/actions/authActions";
import { jwtDecode } from "jwt-decode";

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
    //--------------------simple version-----------------------//
    // Credentials({
    //   id: "otp",
    //   async authorize(credentials: any) {
    //     if (!credentials) return null;
    //     const user = JSON.parse(credentials.user);
    //     console.log("user in authorize", user);
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

        // console.log("user in authorize", user);

        // fix roles
        let roles: any[] = [];
        try {
          roles = JSON.parse(String(credentials.roles ?? "[]"));
        } catch {
          roles = [];
        }
        console.log("credentials in authorize", credentials);

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
        //   token['user']=user
        // token['id'] = user.id;
        token["user"] = user;
      }

      console.log({ trigger });
      let manualTrigger;
      // let myuser: JWTType["user"] = token.user;
      let myuser: any = token.user;
      const exxxp = Math.floor(Number(myuser.accessTokenExpiration) * 1000);
      if (myuser) {
        console.log(
          { exp: exxxp },
          { now: Date.now(), diff: (exxxp - Date.now()) / 1000 / 60 }
        );
        if (exxxp < Date.now()) {
          manualTrigger = true;
        }
      }
      if (trigger === "update" || manualTrigger) {
        // console.log(">>>>>>>>>>in update<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        const res = await refreshTokens(myuser.refreshToken);
        // console.log("res of new tokens", res);
        if (res.ok) {
          const newDecodedAccessToken: JWTType = jwtDecode(
            res.body.access_token
          );
          // console.log("sssssss", newDecodedAccessToken);
          myuser = newDecodedAccessToken.user;
          myuser.refreshToken = res.body.refresh_token;
          myuser.accessToken = res.body.access_token;
          myuser.accessTokenExpiration = newDecodedAccessToken.exp;

          // myuser.accessTokenExpiration=newDecodedAccessToken.exp
          // myuser.created_at=newDecodedAccessToken.user.verified_at
          // myuser.first_name=newDecodedAccessToken.user.first_name
          // myuser.last_name=newDecodedAccessToken.user.last_name
          // myuser.id=newDecodedAccessToken.user.id
          // myuser.created_at=newDecodedAccessToken.user.created_at
          // myuser.email=newDecodedAccessToken.user.email
          // myuser.mobile=newDecodedAccessToken.user.mobile
          // myuser.national_code=newDecodedAccessToken.user.national_code
          // myuser.=newDecodedAccessToken.user.national_code

          token["user"] = myuser;

          // myuser. =res.body.token_type
        }else{
          throw res.message
        }
        // const user: JWTType["user"] =token.user
        // user.accessToken="ssss"
      }

      // if(Date.now()>token.user.accessTokenExpiration){
      //   const newTokens = await refreshTokens(token.user.refreshToken)
      //   if(newTokens.ok){
      //     token['user']['accessToken']=newTokens.body.access_token
      //     token['user']['refreshToken:']=newTokens.body.refresh_token
      //   }
      // }

      // console.log("------------------jwt call back ---------------------");
      // console.log("token in JWT call back", token);
      // console.log("user in JWT call back", user);
      // console.log("session in JWT call back", session);
      // console.log("account in JWT call back", account);
      // console.log("------------------jwt call back End ---------------------");

      return token;
    },
    session: async ({ session, token, user, trigger }) => {
      // console.log("triger in session", trigger);
      if (session.user) {
        // session.user["name"] = "ssss";
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

      // console.log("------------------SESSION call back ---------------------");
      // console.log("token in SESSION call back", token);
      // console.log("user in SESSION call back", user);
      // console.log("session in SESSION call back", session);
      // console.log(
      //   "------------------SESSION call back End ---------------------"
      // );

      return session;
    },
  },
} satisfies NextAuthConfig;

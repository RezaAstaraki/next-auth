import NextAuth from "next-auth";
import { authConfig } from "@/auth_setup/auth_config";

export const {
  auth,
  handlers,
  signIn: ServerSignIn,
  signOut: ServerSignOut,
} = NextAuth(authConfig);

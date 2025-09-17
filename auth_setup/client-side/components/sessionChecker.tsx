"use client";

import { ReactNode } from "react";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {
  children: ReactNode;
};

export default function SessionChecker({ children }: Props) {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    console.log("session in session checker", session, { status });
    if (session?.error) {
      console.log("sign out trigger");
      signOut();
    }
  }, [session, status]);

  return <>{children}</>;
}

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
      signOut({redirect:true,redirectTo:'/'});
    }
    if (Number(session?.exp) < (Date.now() / 1000)) {
      console.log("update by session checker")
      update('need update')
    }
  }, [session, status]);

  return <>{children}</>;
}

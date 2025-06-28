"use client";

import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
// import '@/styles/nprogress.css'

NProgress.configure({ showSpinner: false });

export default function ProgressbarC() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}

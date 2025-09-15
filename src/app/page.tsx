"use client";
import { Button } from "@heroui/button";
import Logo from "../components/general components/logo/Logo";
import { LogoIcon } from "../components/icons";
import { test } from "@/actions/authActions";
import { profileShow } from "@/actions/user/user-actions";

export default function HomePage() {
  return (
    <section className="flex  flex-1 items-center justify-center gap-4 py-8 md:py-10">
      <Logo className="flex flex-col " showTitle />
      <Button
        onPress={async () => {
         const res = await test();
         console.log(res)
        }}
      >
        testttts
      </Button>
      <Button
        onPress={async () => {
         const res = await profileShow();
         console.log(res)
        }}
      >
        testttts222222 show profile
      </Button>
    </section>
  );
}

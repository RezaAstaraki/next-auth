'use client'
import { Button } from "@heroui/button";
import Logo from "../components/general components/logo/Logo";
import { LogoIcon } from "../components/icons";
import { test } from "@/actions/authActions";


export default function HomePage() {

  return (
    <section className="flex  flex-1 items-center justify-center gap-4 py-8 md:py-10">
    <Logo className="flex flex-col " showTitle />
    <Button onPress={async()=>{
     await test()
    }}>testttts</Button>
    </section>
  );
}

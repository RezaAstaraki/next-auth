
import NotFound from "@/src/components/general components/not-found/NotFound";
import { siteConfig } from "@/src/config/site";
import { Button } from "@heroui/button";
import { notFound, redirect, RedirectType } from "next/navigation";
import ShowTokens from "./ShowTokens";


type Props = {};

export default function page({}: Props) {
  if (
    process.env.NODE_ENV === "development"
  ) {
    return (
      <div>
        <ShowTokens />
        
      </div>
    );
  } else {
    return <NotFound />;
  }
}

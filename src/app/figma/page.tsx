import { siteConfig } from "@/src/config/site";
import { notFound, redirect, RedirectType } from "next/navigation";

type Props = {};

export default function page({}: Props) {
  if (
    process.env.NODE_ENV === "development" &&
    !!siteConfig.links?.figma &&
    siteConfig.links.figma !== ""
  ) {
    redirect(siteConfig.links?.figma, RedirectType.replace);
  } else {
    return notFound();
  }
}

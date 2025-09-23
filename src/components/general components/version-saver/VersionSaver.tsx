import { ServerUrlMaker } from "@/src/lib/serverUtils";
import pkg from "@/package.json";
import { formatDate } from "@/src/lib/formatUtils";
import { cn } from "@/src/lib/utils";
import { siteConfig } from "@/src/config/site";

type Props = {
  className?: string;
  vertical?:boolean
  divider?:string
  dir?:"ltr"|"rtl" 
};

export default async function VersionSaver({ className ,vertical,divider,dir="ltr" }: Props) {
  const res = await fetch(ServerUrlMaker("/up"), {
    method: "GET",
    cache: "force-cache",
    next:{revalidate:false}
  });
  return (
    <div dir={dir} className={cn("text-xs",{'flex flex-col':vertical},className)}>
      <span >
        {siteConfig.siteTitle}-Version:{pkg.version}{divider ?? " | "}
      </span>
      <span>
        <span dir="rtl">{formatDate(res.headers.get("date"))}</span> {divider ?? " | "}
      </span>
      <span>
        API-Version:
        <span>{res.headers.get("x-app-version")}</span>
      </span>
    </div>
  );
}

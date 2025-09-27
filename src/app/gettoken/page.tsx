import { getDecodedToken } from "@/actions/authActions";
import NotFound from "@/src/components/general components/not-found/NotFound";
import { siteConfig } from "@/src/config/site";
import { Button } from "@heroui/button";
import { notFound, redirect, RedirectType } from "next/navigation";

type Props = {};

export default function page({}: Props) {
//   if (
//     process.env.NODE_ENV === "development" &&
//     !!siteConfig.links?.figma &&
//     siteConfig.links.figma !== ""
//   ) {
    return (
      <div>
        <Button
          onPress={async () => {
            const res = await getDecodedToken();
            console.log({ decode: res });
          }}
        >
          decode
        </Button>
      </div>
    );
//   } else {
//     return <NotFound />;
//   }
}

"use client";

import { getDecodedToken, JWTType } from "@/actions/authActions";
import Clo from "@/src/components/general components/client logger/Clo";
import { Button } from "@heroui/button";
import { useState } from "react";

type Props = {};

export default function ShowTokens({}: Props) {
  const [data, setData] = useState<JWTType>();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (data?.user.accessToken) {
      await navigator.clipboard.writeText(data.user.accessToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    }
  };

  return (
    <>
      <Button
        onPress={async () => {
          const res = await getDecodedToken();
          if (res) {
            setData(res);
          }
          console.log({ decode: res });
        }}
      >
        decode
      </Button>

      <div className="border overflow-auto flex items-center gap-2 p-2">
        <span className="flex-1 break-all">{data?.user.accessToken}</span>
        {data?.user.accessToken && (
          <Button size="sm" variant="flat" onPress={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        )}
      </div>

      <Clo data={data} />
    </>
  );
}

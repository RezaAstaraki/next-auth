// import CustomImage from "@/components/image/CustomImage";

import React from "react";

// import {
//   NEXT_PUBLIC_LOGO_ADRESS,
//   NEXT_PUBLIC_WEBSITE_TITLE,
// } from "@/lib/environment";

import Image from "next/image";
import { boolean } from "zod";
import { siteConfig } from "@/src/config/site";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { LogoIcon } from "../../icons";

export default function Logo({
  width = 44,
  height = 44,
  fontSize,
  showTitle = false,
  className,
}: {
  width?: number;
  showTitle?: boolean;
  height?: number;
  fontSize?: number;
  className?: string;
}) {
  return (
    <Link
      href={"/"}
      className={clsx(
        `flex items-center text-center justify-center text-[20px] text-blue-main`,
        className
      )}
      style={{ fontSize: `${fontSize}px` || undefined }}
    >
      <div
        className="flex items-center justify-center flex-none"
        style={{
          width: width,
          height: height,
          minWidth: width,
          minHeight: height,
        }}
      >
        <Image
          className="object-scale-down w-full h-full"
          src={"/logo.svg"}
          width={width}
          height={height}
          alt="Header Logo"
        />
      </div>
      {showTitle && (
        <p className="font-javan text-nowrap ">
          <span className="">{siteConfig.siteTitle}</span>{" "}
        </p>
      )}
    </Link>
  );
}

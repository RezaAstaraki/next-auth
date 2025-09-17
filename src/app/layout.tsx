import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { Navbar } from "@/src/components/navbar";
import NextUiProviders from "../components/providers/nextui-provider/NextuiProviders";
import RootModal from "../components/general components/modals/RootModal";
import { Toaster } from "sonner";
import Footer from "../components/footer/Footer";
import { SessionProvider } from "next-auth/react";
import SessionChecker from "@/auth_setup/client-side/components/sessionChecker";

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteTitle,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        dir="rlt"
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionProvider>
          <SessionChecker>
            <NextUiProviders
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              <div className="relative flex flex-col h-screen">
                <Navbar />
                <main className="container mx-auto flex flex-1 flex-col max-w-7xl pt-16 px-6 flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              <RootModal />
              <Toaster dir="rtl" richColors position="top-center" expand />
            </NextUiProviders>
          </SessionChecker>
        </SessionProvider>
      </body>
    </html>
  );
}

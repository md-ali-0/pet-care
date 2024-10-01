import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import { Providers } from "./providers";

import { fontJost } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import ReduxProvider from "@/provider/redux-provider";
import { SessionProvider } from "@/provider/session-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontJost.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
          }}
        >
          <SessionProvider>
            <ReduxProvider>
              <div className="relative flex flex-col h-screen">{children}</div>
            </ReduxProvider>
          </SessionProvider>
          <Toaster expand={false} richColors={true} />
        </Providers>
      </body>
    </html>
  );
}

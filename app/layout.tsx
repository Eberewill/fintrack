import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resilience17",
  description: "A Next.js application with a modern UI",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#ffffff",
};

const font = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});

import { ApiClientWrapper } from "../contexts/api.context";

function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full font-sans ">
      <body className={`scroll-smooth ${font.className}`}>
        <ApiClientWrapper>
          {children}
        </ApiClientWrapper>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutWrapper>{children}</RootLayoutWrapper>;
}

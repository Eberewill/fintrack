import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});

function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full font-poppins">
      <body className={`scroll-smooth ${font.className}`}>{children}</body>
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

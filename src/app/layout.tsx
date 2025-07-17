import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Todo App - Next.js with RTK Query",
  description:
    "A todo application built with Next.js, Redux Toolkit Query, SSR, and ISR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

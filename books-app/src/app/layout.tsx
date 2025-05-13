import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { HorizontalLayout } from "@/layouts/books/horizontal-layout";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "My Book Notes",
  description: "Book notes application",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <Providers>
          <HorizontalLayout>{children}</HorizontalLayout>
        </Providers>
      </body>
    </html>
  );
}

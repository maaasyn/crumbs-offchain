import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crumbs",
  description: "Comment everything, everywhere.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crumbs.eurekonomicon.com",
    title: "Crumbs",
    siteName: "Crumbs",
    description: "Comment everything, everywhere.",
    images: [
      {
        url: "/crumbs-og.png",
        width: 1299,
        height: 810,
        alt: "Crumbs",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

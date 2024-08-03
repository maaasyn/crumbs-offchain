import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const getRootUrl = () => {
  if (process.env.ROOT_URL) {
    return `https://${process.env.ROOT_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT || 3000}`;
};
// ROOT_URL
export const metadata: Metadata = {
  metadataBase: new URL(getRootUrl()),
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

import type { Metadata } from "next";
import { Playfair_Display, Inter, Permanent_Marker, Caveat, Italianno, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: ["400"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const italianno = Italianno({
  variable: "--font-roman",
  subsets: ["latin"],
  weight: ["400"],
});

const oldEnglish = UnifrakturMaguntia({
  variable: "--font-old-english",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sahara Hostel - Your Home Away From Home",
  description: "Sahara Hostel brings together everyone who once called Sahara home — building lifelong friendships and memories.",
  keywords: ["Sahara Hostel", "Alumni Network", "College Hostel", "Hostel Life", "Sahara Connect"],
  authors: [{ name: "Sahara Connect Team" }],
  openGraph: {
    title: "Sahara Hostel - Your Home Away From Home",
    description: "Connect with fellow Sahara Hostel alumni and relive the memories.",
    url: "https://sahara-connect.vercel.app",
    siteName: "Sahara Connect",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahara Hostel - Your Home Away From Home",
    description: "Relive the memories and connect with Sahara Hostel alumni.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${marker.variable} ${caveat.variable} ${italianno.variable} ${oldEnglish.variable} antialiased bg-[#F9F6F0] text-[#2C2C2C] selection:bg-[#6b8e73]/30`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

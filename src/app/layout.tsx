import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/providers/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/nav/Navbar";
import Wrapper from "@/components/Wrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Facts Blog",
  description: "A Modern blogging website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased`}
      >
        <SessionWrapper>
          <Navbar />
          <Wrapper>{children}</Wrapper>
          <Footer />

          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}

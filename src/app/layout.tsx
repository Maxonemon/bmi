import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Track your BMI for a better healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-950 m-10 min-h-screen flex flex-col  `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

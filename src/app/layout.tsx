import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noble Basketball",
  description: "Comprehensive youth training and skill development programs for basketball enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-emerald-50 text-gray-900 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="pt-24 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KCET College Predictor",
  description: "Predict Engineering Colleges using 2025 KCET Cutoff Data",
  keywords: [
    "KCET",
    "KCET Predictor",
    "Engineering Colleges",
    "KCET 2025",
    "College Predictor",
    "Karnataka Engineering",
  ],
  authors: [
    {
      name: "Chiranth V",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
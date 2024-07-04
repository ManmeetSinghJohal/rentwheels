import type { Metadata } from "next";
import React from "react";
import { Inter} from "next/font/google";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import "@uploadthing/react/styles.css";
import Head from "next/head";

import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { ourFileRouter } from "./api/uploadthing/core";
import { elements } from "@/styles/clerkPopoverStyle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rentwheels-jade.vercel.app"),
  title: {
    template: "%s | RentWheels",
    default: "RentWheels",
  },
  description: "Find your next car with RentWheels, the best platform for renting cars online.",
  keywords: ["Rent", "Cars", "Online", "RentWheels"],
  icons: ["/favicon.ico"],
  openGraph: {
    title: "RentWheels",
    description: "Find your next car with RentWheels, the best platform for renting cars online.",
    type: "website",
    url: "https://rentwheels-jade.vercel.app",
    images: ["https://rentwheels-jade.vercel.app/images/Ads1.jpg", "https://rentwheels-jade.vercel.app/images/Ads2.jpg", "https://rentwheels-jade.vercel.app/images/rent-wheels-logo.jpg"],
    siteName: "RentWheels",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": "none",
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieProvider = cookies();
  const theme = cookieProvider.get("theme")?.value || "light";
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
        },
        elements,
      }}
    >
      <ThemeProvider theme={theme}>
        <html lang="en">
          <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Head>
          <body className={`${inter.className}`}>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <main className="select-none dark:bg-gray-900">
              <Navbar />
              <div className="mx-auto max-w-[1440px]">
                <div className="min-h-screen bg-white-200 px-6 dark:bg-gray-900 md:px-0">{children}</div>
                <Toaster />
                <Footer />
              </div>
            </main>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}

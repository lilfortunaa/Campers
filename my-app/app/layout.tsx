import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header"; 
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://campersproject.netlify.app/"),
  title: "TravelTrucks",
  description: "Оренда кемперів для подорожей. Каталог, бронювання та відгуки про кемпери.",
  keywords: "кемпери, оренда, подорожі, TravelTrucks",
  authors: [{ name: "Bohdan Ivaschenko" }],
  icons: {
    icon: [
      { url: "/favicon/favicon-64x64.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/favicon/favicon-64x64.png" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "TravelTrucks",
    description: "Оренда кемперів для подорожей.",
    url: "https://campersproject.netlify.app/",
    siteName: "TravelTrucks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelTrucks",
    description: "Оренда кемперів для подорожей. Каталог, бронювання та відгуки.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <Toaster />
        {children}
      </body>
    </html>
  );
}

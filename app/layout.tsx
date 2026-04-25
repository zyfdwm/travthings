import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter_Tight } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travelthings.pages.dev"),
  title: {
    default: "Travel Things | Curated Destinations & Tailored Itineraries",
    template: "%s | Travel Things"
  },
  description:
    "Discover expert-verified destinations and travel itineraries with Travel Things. Experience the world at your own pace with our premium concierge service.",
  applicationName: "Travel Things",
  appleWebApp: {
    title: "Travel Things",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "Ka1_u9PJKQ4aqsiHX0kk44nyM-jvXXqPMRrxtmfEG1o",
  },
  openGraph: {
    title: "Travel Things | Curated Destinations & Tailored Itineraries",
    description: "Discover expert-verified destinations and travel itineraries with Travel Things...",
    url: "https://travelthings.pages.dev",
    siteName: "Travel Things",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Things",
    description: "Discover expert-verified destinations and travel itineraries with Travel Things...",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Travel Things",
    "url": "https://travelthings.pages.dev",
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${interTight.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to GYG for faster widget loading */}
        <link rel="preconnect" href="https://widget.getyourguide.com" />
        <link rel="dns-prefetch" href="https://widget.getyourguide.com" />

        {/* GetYourGuide Analytics */}
        <Script
          src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
          data-gyg-partner-id="KJBNEUM"
          strategy="afterInteractive"
        />

      </head>
      <body data-scroll-behavior="smooth">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
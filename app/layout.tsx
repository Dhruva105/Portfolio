import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Space_Grotesk } from "next/font/google";
import "./globals.scss";
import { isIndexable, siteUrl } from "@/app/lib/site-url";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Dhruv Pal — AI/ML, Software & Applied Research",
    template: "%s | Dhruv Pal",
  },
  description:
    "Dhruv Pal is a Computer Science and Engineering undergraduate at Lovely Professional University, exploring applied AI, software systems, and research.",
  applicationName: "Dhruv Pal — Portfolio",
  openGraph: {
    type: "website",
    title: "Dhruv Pal — AI/ML, Software & Applied Research",
    description:
      "Building intelligent systems. Engineering practical solutions. Exploring what comes next.",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/images/dhruv-cinematic.png",
              width: 1448,
              height: 1080,
              alt: "Dhruv Pal in a cinematic studio portrait",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Pal — AI/ML, Software & Applied Research",
    description:
      "Building intelligent systems. Engineering practical solutions. Exploring what comes next.",
    ...(siteUrl ? { images: ["/images/dhruv-cinematic.png"] } : {}),
  },
  robots: {
    index: isIndexable,
    follow: isIndexable,
    googleBot: {
      index: isIndexable,
      follow: isIndexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[
          spaceGrotesk.variable,
          inter.variable,
          instrumentSerif.variable,
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}

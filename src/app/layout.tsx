import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import LeadAttribution from "@/components/LeadAttribution";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sumeeturbannest.com"),
  title: {
    default: "Sumeet Urban Nest | 2 & 3 BHK Homes in Khamardih, Raipur",
    template: "%s | Sumeet Urban Nest",
  },
  description:
    "Discover 2 & 3 BHK homes at Sumeet Urban Nest in Khamardih, Shankar Nagar, Raipur. Explore premium residences, amenities, master plan and floor plans.",
  keywords: [
    "Sumeet Urban Nest",
    "BHK homes",
    "Khamardih",
    "Shankar Nagar",
    "Raipur",
    "2 BHK",
    "3 BHK",
    "Chhattisgarh",
    "Sumeet Infracon Pvt. Ltd.",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Sumeet Urban Nest",
    title: "Sumeet Urban Nest | 2 & 3 BHK Homes in Khamardih, Raipur",
    description: "Premium 2 & 3 BHK homes in Khamardih, Shankar Nagar, Raipur.",
    images: [{ url: "/images/exterior/hero-building.webp", width: 1920, height: 1080, alt: "Sumeet Urban Nest exterior elevation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumeet Urban Nest | 2 & 3 BHK Homes in Raipur",
    description: "Explore premium homes, amenities and floor plans in Khamardih, Raipur.",
    images: ["/images/exterior/hero-building.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased`}>
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TZMGJLFG');`,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TZMGJLFG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LeadAttribution />
        {children}
      </body>
    </html>
  );
}

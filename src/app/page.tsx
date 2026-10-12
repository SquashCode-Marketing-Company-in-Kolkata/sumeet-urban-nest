import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import WalkthroughSection from "@/components/WalkthroughSection";
import { WalkthroughVideoProvider } from "@/components/WalkthroughVideo";
import SpecificationsSection from "@/components/SpecificationsSection";
import DeferredSection from "@/components/DeferredSection";
import LocationSection from "@/components/LocationSection";
import LayoutSection from "@/components/LayoutSection";
import DeveloperSection from "@/components/DeveloperSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SiteVisitBar from "@/components/SiteVisitBar";
import { EnquiryProvider } from "@/components/EnquiryPanel";
import Preloader from "@/components/Preloader";

export const dynamic = "force-static";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sumeet Infracon Pvt. Ltd.",
    url: "https://sumeeturbannest.com",
    logo: "https://sumeeturbannest.com/logo.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sumeet Business Park, Pachpedi Naka",
      addressLocality: "Raipur",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Sumeet Urban Nest",
    url: "https://sumeeturbannest.com",
    image: "https://sumeeturbannest.com/images/exterior/hero-building.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Khamardih, Shankar Nagar",
      addressLocality: "Raipur",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
    numberOfAccommodationUnits: 152,
    identifier: { "@type": "PropertyValue", name: "RERA registration number", value: "PCGRERA190326002064" },
  },
];

export default function Home() {
  return (
    <EnquiryProvider>
      <WalkthroughVideoProvider>
        <main className="min-h-screen bg-white">
          <Preloader />
          <link rel="preload" as="image" href="/images/exterior/mobile-hero-elevation.webp" media="(max-width: 767px)" fetchPriority="high" />
          <link rel="preload" as="image" href="/images/exterior/hero-building.webp" media="(min-width: 768px)" fetchPriority="high" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
          <Header />
          <HeroSection />
          <OverviewSection />
          <AmenitiesSection />
          <DeferredSection kind="gallery" />
          <WalkthroughSection />
          <DeferredSection kind="plan" />
          <SpecificationsSection />
          <LocationSection />
          <LayoutSection />
          <ContactSection />
          <DeveloperSection />
          <Footer />
          <SiteVisitBar />
        </main>
      </WalkthroughVideoProvider>
    </EnquiryProvider>
  );
}

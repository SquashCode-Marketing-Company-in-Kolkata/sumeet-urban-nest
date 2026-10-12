"use client";

import { useEffect, useState } from "react";
import { useEnquiry } from "@/components/EnquiryPanel";

const heroSlides = [
  {
    src: "/images/exterior/hero-building.webp",
    mobileSrc: "/images/exterior/mobile-hero-elevation.webp",
    alt: "Sumeet Urban Nest exterior elevation",
  },
  {
    src: "/images/exterior/aerial-view.webp",
    mobileSrc: "/images/exterior/mobile-hero-aerial.webp",
    alt: "Aerial view of Sumeet Urban Nest",
  },
  {
    src: "/images/exterior/gate-view.webp",
    mobileSrc: "/images/exterior/mobile-hero-gate.webp",
    alt: "Entrance gate at Sumeet Urban Nest",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadRemainingSlides, setLoadRemainingSlides] = useState(false);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const loadSlides = () => setLoadRemainingSlides(true);
    if (document.readyState === "complete") loadSlides();
    else window.addEventListener("load", loadSlides, { once: true });
    return () => window.removeEventListener("load", loadSlides);
  }, []);

  useEffect(() => {
    if (!loadRemainingSlides) return;
    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) =>
        currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1,
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [loadRemainingSlides]);

  return (
    <section id="hero" className="relative h-[100svh] min-h-[540px] max-h-[1100px] w-full overflow-hidden max-md:min-h-0">
      {/* Hero background slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (index === 0 || (loadRemainingSlides && index <= activeSlide + 1) || index === activeSlide) && (
          <picture
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
            <img src={slide.src} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "low"} className="h-full w-full object-cover object-center" />
          </picture>
        ))}
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 max-md:from-black/75 max-md:via-black/25 max-md:to-black/10" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1720px] flex-col justify-end gap-6 px-6 pb-16 pt-24 sm:px-10 sm:pb-20 md:px-14 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-20 lg:pb-[max(4.5rem,11svh)] xl:px-28 2xl:px-36">
        <h1 className="min-w-0 text-[clamp(1.125rem,5.9vw,2.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] md:text-[clamp(2.5rem,min(4.6vw,9svh),4.75rem)] lg:text-[clamp(2.125rem,min(3.4vw,9svh),4.75rem)] xl:text-[clamp(2.5rem,min(4.1vw,9svh),4.75rem)]">
          <span className="block whitespace-nowrap font-normal">Khamardih, Shankar Nagar&apos;s</span>
          <span className="block whitespace-nowrap">
            First <span className="font-semibold text-coral">BOHK Homes</span>!
          </span>
        </h1>

        <button type="button" onClick={() => openEnquiry("Request A Call Back / Reveal Price")} className="w-full max-w-[340px] rounded-full bg-coral px-5 py-3 text-sm font-bold text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden">
          Request A Call Back / Reveal Price
        </button>

        <button
          type="button"
          onClick={() => openEnquiry("Book Your 2 & 3 BHK Apartments")}
          aria-label="Enquire about the 30:70 payment plan, first 25 bookings only"
          className="hero-offer group relative hidden w-[300px] shrink-0 cursor-pointer self-start rounded-[22px] border-2 border-dashed border-[#F0A566]/70 bg-[#14100D]/80 px-5 pb-6 pt-6 text-left text-white shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-200 hover:border-[#F0A566] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F0A566]/60 md:block lg:self-end lg:w-[clamp(270px,22vw,330px)] lg:px-6 lg:pb-7 lg:pt-7"
        >
          <span className="absolute -top-3.5 left-5 rounded-full bg-coral px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_20px_rgba(232,115,74,0.45)]">
            First 25 bookings only
          </span>
          <span className="absolute bottom-2 right-4 text-[9px] text-white/50">*T&amp;C apply</span>

          <span className="flex items-stretch gap-4">
            <span className="flex-1">
              <span className="block text-[clamp(2.25rem,min(3.4vw,7.5svh),3.25rem)] font-semibold leading-none tracking-[-0.04em] text-[#F0A566]">
                30%
              </span>
              <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                Pay now
              </span>
            </span>
            <span aria-hidden="true" className="w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <span className="flex-1">
              <span className="block text-[clamp(2.25rem,min(3.4vw,7.5svh),3.25rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                70%
              </span>
              <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                On possession
              </span>
            </span>
          </span>

          <span className="mt-4 block whitespace-nowrap border-t border-white/15 pt-3 text-[13px] font-semibold text-white">
            Book your 2 &amp; 3 BHK Apartments
            <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </button>

        {/* Compact offer ticket for phones */}
        <button
          type="button"
          onClick={() => openEnquiry("Book Your 2 & 3 BHK Apartments")}
          aria-label="Enquire about the 30:70 payment plan, first 25 bookings only"
          className="group relative flex w-full max-w-[340px] cursor-pointer items-center gap-3 rounded-2xl border border-[#F0A566]/50 bg-[#14100D]/75 p-2.5 pr-3 text-left text-white shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-200 active:bg-[#14100D]/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F0A566]/60 md:hidden"
        >
          <span className="flex h-[58px] w-[58px] shrink-0 flex-col items-center justify-center rounded-xl bg-coral leading-none shadow-[0_6px_18px_rgba(232,115,74,0.45)]">
            <span className="text-[17px] font-bold tracking-[-0.03em]">30:70</span>
            <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-white/85">Plan</span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#F0A566]">
              First 25 bookings only
            </span>
              <span className="mt-1 block text-[12px] font-semibold leading-snug min-[380px]:text-[13px]">
                Book your 2 &amp; 3 BHK Apartments
            </span>
          </span>
          <span className="absolute right-3 top-2.5 text-[8px] text-white/45">*T&amp;C</span>
        </button>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 sm:bottom-7 sm:gap-4"
        aria-label={`Hero slide ${activeSlide + 1} of ${heroSlides.length}`}
      >
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show hero slide ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          ><span className={`h-2.5 w-2.5 rounded-full border-2 border-[#F0A566] transition-all sm:h-3 sm:w-3 ${index === activeSlide ? "scale-110 bg-[#F0A566]" : "bg-transparent"}`} /></button>
        ))}
      </div>
    </section>
  );
}

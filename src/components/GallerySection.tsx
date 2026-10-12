"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LuminaInteractiveList, type LuminaSlide } from "@/components/ui/lumina-interactive-list";
import SectionCta from "@/components/SectionCta";

const gallerySlides: LuminaSlide[] = [
  {
    title: "Signature Tower Architecture",
    description: "Contemporary 3-tower elevation with modern vertical geometry and expansive skyward orientation.",
    category: "exterior",
    media: "/images/exterior/hero-building.webp",
  },
  {
    title: "Living & Dining Spaces",
    description: "Bright, generous open-plan interiors designed around natural ventilation, sunlight, and everyday comfort.",
    category: "interior",
    media: "/images/interior/living-dining.webp",
  },
  {
    title: "Podium Gardens",
    description: "Landscaped greens, walking trails, and shaded gazebos creating an elevated retreat close to home.",
    category: "exterior",
    media: "/images/exterior/terrace-sitting.webp",
  },
  {
    title: "Master Bedroom Suite",
    description: "Tranquil master bedroom retreat designed with elegant wooden flooring and expansive floor-to-ceiling windows.",
    category: "interior",
    media: "/images/interior/bedroom.webp",
  },
  {
    title: "Rooftop Swimming Pool",
    description: "An elevated rooftop swimming pool and sundeck bringing resort-style recreation into the open sky.",
    category: "exterior",
    media: "/images/exterior/swimming-pool.webp",
  },
  {
    title: "Grand Arrival Lobby",
    description: "A welcoming double-height arrival lobby with concierge reception setting a refined tone from the first step.",
    category: "interior",
    media: "/images/interior/entrance-lobby.webp",
  },
  {
    title: "Panoramic Aerial Overview",
    description: "Bird's eye perspective of the 1.76-acre master plan nestled in prime Khamardih, Shankar Nagar.",
    category: "exterior",
    media: "/images/exterior/aerial-view.webp",
  },
  {
    title: "Modern Fitness Studio",
    description: "State-of-the-art gymnasium and wellness zone designed to inspire healthy daily lifestyles.",
    category: "interior",
    media: "/images/interior/gym.webp",
  },
  {
    title: "Private Sky Balconies",
    description: "Expansive outdoor balconies seamlessly extending private rooms toward panoramic city views.",
    category: "exterior",
    media: "/images/exterior/balcony-view.webp",
  },
  {
    title: "Private Screening Theatre",
    description: "Acoustically crafted mini theatre for private cinematic screenings and family movie evenings.",
    category: "interior",
    media: "/images/interior/home-theater.webp",
  },
  {
    title: "Temple & Sacred Gardens",
    description: "Dedicated spiritual shrine enclosed within landscaped manicured flora and peaceful walkways.",
    category: "exterior",
    media: "/images/exterior/temple-view.webp",
  },
  {
    title: "Indoor Recreation Arena",
    description: "Vibrant community games lounge equipped with table tennis, chess, and multi-game tables.",
    category: "interior",
    media: "/images/interior/indoor-games.webp",
  },
  {
    title: "Grand Entry Boulevard",
    description: "Impressive entrance gate with 24/7 security control, tree-lined avenue, and vehicular drop-off.",
    category: "exterior",
    media: "/images/exterior/gate-view.webp",
  },
  {
    title: "Yoga & Meditation Deck",
    description: "Peaceful sunlit wooden studio tailored for early morning pranayama, yoga, and wellness sessions.",
    category: "interior",
    media: "/images/interior/yoga-room.webp",
  },
];

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      } else if (event.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % gallerySlides.length : null));
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + gallerySlides.length) % gallerySlides.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + gallerySlides.length) % gallerySlides.length : null
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % gallerySlides.length : null));
  };

  const currentSlide = selectedIndex !== null ? gallerySlides[selectedIndex] : null;

  return (
    <>
      <section className="scroll-mt-20">
        <LuminaInteractiveList slides={gallerySlides} onOpen={setSelectedIndex} footer={<SectionCta label="Download Brochure" />} />
      </section>

      {selectedIndex !== null && currentSlide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 p-4 backdrop-blur-xl sm:p-6 md:p-8"
        >
          {/* Top Bar with counter & close */}
          <div
            className="flex w-full max-w-[1600px] items-center justify-between pb-3 sm:pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6AC70]">
                {currentSlide.category === "interior" ? "Interior" : "Exterior"}
              </span>
              <span className="text-xs tracking-widest text-white/60">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(gallerySlides.length).padStart(2, "0")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close image preview"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl text-white transition hover:bg-white hover:text-black"
            >
              ×
            </button>
          </div>

          {/* Central Image Container with Left / Right Arrows */}
          <div
            className="relative flex h-[68vh] w-full max-w-[1600px] items-center justify-center sm:h-[72vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 text-xl text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-coral hover:border-coral sm:left-4 sm:h-14 sm:w-14"
            >
              &#8592;
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 text-xl text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-coral hover:border-coral sm:right-4 sm:h-14 sm:w-14"
            >
              &#8594;
            </button>

            {/* Main Image */}
            <div className="relative h-full w-full">
              <Image
                src={currentSlide.media}
                alt={currentSlide.title}
                fill
                className="object-contain"
                sizes="(max-width: 1080px) 100vw, 1080px"
              />
            </div>
          </div>

          {/* Bottom Information Card */}
          <div
            className="w-full max-w-[1600px] pt-3 text-center sm:pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-light tracking-wide text-white sm:text-2xl">
              {currentSlide.title}
            </h3>
            <p className="section-description mx-auto mt-1 max-w-[700px] text-white/70">
              {currentSlide.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

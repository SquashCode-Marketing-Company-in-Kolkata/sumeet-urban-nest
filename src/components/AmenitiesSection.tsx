import Image from "next/image";
import SectionCta from "@/components/SectionCta";

const podiumAmenities = [
  {
    name: "Landscaped Garden",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <circle cx="36" cy="12" r="4.5" strokeDasharray="2 2" />
        <path d="M12 28c-4 0-7-3-7-7a7 7 0 0113-3 6 6 0 0111 2c0 4-3 8-7 8" />
        <line x1="18" y1="28" x2="18" y2="40" />
        <path d="M26 34h16M28 30v10M40 30v10" />
        <line x1="4" y1="40" x2="44" y2="40" />
      </svg>
    ),
  },
  {
    name: "Children's Play Area",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path d="M18 10l6-6 6 6v28H18V10z" />
        <line x1="18" y1="20" x2="30" y2="20" />
        <line x1="18" y1="28" x2="30" y2="28" />
        <path d="M30 18c6 0 10 10 14 20" />
        <path d="M18 20L10 38" />
        <line x1="6" y1="38" x2="44" y2="38" />
      </svg>
    ),
  },
  {
    name: "Temple",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <line x1="24" y1="4" x2="24" y2="8" />
        <path d="M21 8h6l-3-4-3 4z" />
        <path d="M24 8c-6 8-8 16-10 22h20c-2-6-4-14-10-22z" />
        <path d="M10 30h28v10H10V30z" />
        <path d="M20 40v-6a4 4 0 018 0v6" />
        <line x1="6" y1="40" x2="42" y2="40" />
      </svg>
    ),
  },
  {
    name: "Open Recreational Zones",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <circle cx="36" cy="18" r="8" />
        <line x1="36" y1="26" x2="36" y2="38" />
        <path d="M8 26h18M8 31h18M11 22v16M23 22v16" />
        <line x1="4" y1="38" x2="44" y2="38" />
      </svg>
    ),
  },
];

const rooftopAmenities = [
  {
    name: "Jogging / Walking Track",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <circle cx="20" cy="12" r="4" />
        <path d="M16 22l4-4 4 4-2 7 6 5" />
        <path d="M18 29l-4 9" />
        <path d="M12 24l4-3" />
        <path d="M30 18c3-3 8-3 10 2 2 4 1 8-2 10" />
        <line x1="36" y1="30" x2="36" y2="40" />
        <path d="M4 42c12-3 24-3 40 0" />
      </svg>
    ),
  },
  {
    name: "Seating & Relaxation Areas",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <circle cx="26" cy="12" r="3.5" />
        <path d="M18 20c4-2 8 0 10 4l-4 6 8 8" />
        <path d="M14 26l6-4" />
        <path d="M10 26l8 12h14" />
        <line x1="16" y1="38" x2="12" y2="42" />
        <line x1="30" y1="38" x2="34" y2="42" />
      </svg>
    ),
  },
  {
    name: "Open Sky Recreation Zones",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path d="M8 20L24 8l16 12" />
        <line x1="12" y1="20" x2="12" y2="40" />
        <line x1="36" y1="20" x2="36" y2="40" />
        <line x1="8" y1="28" x2="40" y2="28" />
        <circle cx="24" cy="22" r="3" />
        <line x1="4" y1="40" x2="44" y2="40" />
      </svg>
    ),
  },
];

const clubAmenities = [
  {
    name: "Gymnasium",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <circle cx="28" cy="12" r="3.5" />
        <path d="M22 24l5-4 4 3-2 7 5 6" />
        <path d="M24 29l-5 8" />
        <path d="M38 16v22" />
        <path d="M34 16h6" />
        <path d="M10 38l28-4" />
        <line x1="8" y1="40" x2="42" y2="40" />
      </svg>
    ),
  },
  {
    name: "Indoor Games",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="3.5" />
        <circle cx="34" cy="14" r="3.5" />
        <path d="M10 30v-6a4 4 0 014-4h2" />
        <path d="M38 30v-6a4 4 0 00-4-4h-2" />
        <path d="M18 26h12v12H18z" />
        <line x1="10" y1="36" x2="10" y2="40" />
        <line x1="38" y1="36" x2="38" y2="40" />
        <line x1="24" y1="26" x2="24" y2="38" />
      </svg>
    ),
  },
  {
    name: "Community Hall",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path d="M8 12h32v4H8z" />
        <path d="M8 16v24M40 16v24" />
        <path d="M8 16c6 8 8 16 8 24M40 16c-6 8-8 16-8 24" />
        <line x1="16" y1="24" x2="32" y2="24" />
        <line x1="6" y1="40" x2="42" y2="40" />
      </svg>
    ),
  },
  {
    name: "Swimming Pool",
    icon: (
      <svg
        className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <circle cx="36" cy="14" r="3.5" />
        <path d="M26 22l6-4 4 2" />
        <path d="M22 28l6-4" />
        <path d="M6 30c4-2 8-2 12 0s8 2 12 0 8-2 12 0" />
        <path d="M6 36c4-2 8-2 12 0s8 2 12 0 8-2 12 0" />
      </svg>
    ),
  },
  {
    name: "Yoga Room",
    icon: (
      <svg className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <circle cx="24" cy="10" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 14v12m-8-8 8 4 8-4M24 26l-12 8 12 6 12-6-12-8M12 34H6m30 0h6" />
      </svg>
    ),
  },
  {
    name: "Mini Theatre",
    icon: (
      <svg className="h-11 w-11 text-[#D6AC70] md:h-12 md:w-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <rect x="6" y="6" width="36" height="24" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m20 12 10 6-10 6V12M10 36h10v6H10zm18 0h10v6H28z" />
      </svg>
    ),
  },
];

export default function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="relative scroll-mt-20 overflow-hidden bg-[#f7f4f1] py-20 text-[#1a1a1a] sm:py-24 md:py-28 lg:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-coral/10 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-[800px] text-center sm:mb-12 md:mb-16">
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-3">
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Curated Lifestyle · 02
            </span>
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
          </div>

          <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            AMENITIES
          </h2>

          <p className="section-description mx-auto mt-4 sm:mt-6 max-w-[680px] text-[#6d625c]">
            From courtyard greens to open skies above, every space at Sumeet
            Urban Nest invites you to take your day outdoors.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {/* 1. Podium + Ground Card */}
          <article className="group overflow-hidden rounded-[26px] border border-[#e8ded7] bg-white shadow-[0_12px_35px_rgba(83,55,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(83,55,39,0.14)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src="/images/exterior/podium-kids-play.webp" alt="Podium and ground amenities" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute right-3.5 top-3.5 z-10 rounded-full border border-white/30 bg-black/45 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-sm backdrop-blur-md whitespace-nowrap sm:right-4 sm:top-4">
                {String(podiumAmenities.length).padStart(2, "0")} spaces
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffc79b]">
                  Outdoor living
                </p>
                <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">
                  Podium + Ground
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-1.5 sm:p-5 lg:grid-cols-1">
              {podiumAmenities.map((amenity) => (
                <div
                  key={amenity.name}
                  className="flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-[#fff5ee] sm:gap-4 sm:p-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8f1e8] sm:h-12 sm:w-12 [&>svg]:h-7 [&>svg]:w-7 sm:[&>svg]:h-8 sm:[&>svg]:w-8">
                    {amenity.icon}
                  </div>
                  <p className="section-description font-medium text-[#2c2b29] lg:text-[14px] lg:leading-6">
                    {amenity.name}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* 2. Rooftop Card */}
          <article className="group overflow-hidden rounded-[26px] border border-[#e8ded7] bg-white shadow-[0_12px_35px_rgba(83,55,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(83,55,39,0.14)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src="/images/exterior/terrace-sitting.webp" alt="Rooftop amenities" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute right-3.5 top-3.5 z-10 rounded-full border border-white/30 bg-black/45 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-sm backdrop-blur-md whitespace-nowrap sm:right-4 sm:top-4">
                {String(rooftopAmenities.length).padStart(2, "0")} spaces
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffc79b]">
                  Under open skies
                </p>
                <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">
                  Rooftop
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-1.5 sm:p-5 lg:grid-cols-1">
              {rooftopAmenities.map((amenity) => (
                <div
                  key={amenity.name}
                  className="flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-[#fff5ee] sm:gap-4 sm:p-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8f1e8] sm:h-12 sm:w-12 [&>svg]:h-7 [&>svg]:w-7 sm:[&>svg]:h-8 sm:[&>svg]:w-8">
                    {amenity.icon}
                  </div>
                  <p className="section-description font-medium text-[#2c2b29] lg:text-[14px] lg:leading-6">
                    {amenity.name}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* 3. Club Card */}
          <article className="group overflow-hidden rounded-[26px] border border-[#e8ded7] bg-white shadow-[0_12px_35px_rgba(83,55,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(83,55,39,0.14)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src="/images/interior/community-hall.webp" alt="Club amenities" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute right-3.5 top-3.5 z-10 rounded-full border border-white/30 bg-black/45 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-sm backdrop-blur-md whitespace-nowrap sm:right-4 sm:top-4">
                {String(clubAmenities.length).padStart(2, "0")} spaces
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffc79b]">
                  Wellness + community
                </p>
                <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">
                  Club
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-1.5 sm:p-5 lg:grid-cols-1">
              {clubAmenities.map((amenity) => (
                <div
                  key={amenity.name}
                  className="flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-[#fff5ee] sm:gap-4 sm:p-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8f1e8] sm:h-12 sm:w-12 [&>svg]:h-7 [&>svg]:w-7 sm:[&>svg]:h-8 sm:[&>svg]:w-8">
                    {amenity.icon}
                  </div>
                  <p className="section-description font-medium text-[#2c2b29] lg:text-[14px] lg:leading-6">
                    {amenity.name}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
        <div className="mt-8 text-center sm:mt-10">
          <SectionCta label="Schedule a Site Visit" />
        </div>
      </div>
    </section>
  );
}

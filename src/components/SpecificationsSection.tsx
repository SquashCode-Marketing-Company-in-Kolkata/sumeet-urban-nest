"use client";

import { useEffect, useRef, useState } from "react";

const specifications = [
  {
    title: "Flooring",
    details: [
      "800 × 1600 mm vitrified tiles in living, dining and drawing areas",
      "Wooden flooring in the master bedroom",
      "Vitrified tiles (600 × 1200 or 600 × 600 mm) in other rooms",
      "Anti-skid tiles in balcony and wash area",
    ],
  },
  {
    title: "Doors",
    details: [
      "Wood frame and waterproof flush door with veneer finish for the main door and laminate finish for all internal doors",
    ],
  },
  {
    title: "Window",
    details: ["Aluminium sliding windows with mosquito net"],
  },
  {
    title: "Toilets",
    details: [
      "600 × 1200 mm vitrified tiles in toilets, dado up to 8 ft on walls, and 600 × 600 mm vitrified floor tiles",
    ],
  },
  {
    title: "Plumbing",
    details: [
      "Single-lever diverter in the shower area",
      "Wall-hung WCs and countertop wash basin",
      "Electrical points for geyser, exhaust fan and mirror light",
    ],
  },
  {
    title: "Kitchen",
    details: [
      "Quartz full-body platform compatible with a modular kitchen",
      "Provision for refrigerator, chimney, water purifier and microwave electrical points, with plumbing for kitchen sink, water purifier and washing machine",
    ],
  },
  {
    title: "Wall Finish",
    details: [
      "Cement-based wall putty finished with primer on all interior walls",
      "Weatherproof emulsion paint on exterior walls",
    ],
  },
  {
    title: "Electrical",
    details: [
      "Electrical points provided as per standard furniture layout",
      "TV and AC points in all bedrooms and the living room",
      "Fire-retardant cables and modular switches from reputed brands",
    ],
  },
];

const ROTATION_INTERVAL = 8500; // 8.5 seconds for ample reading time

export default function SpecificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % specifications.length);
    }, ROTATION_INTERVAL);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isHovered]);

  useEffect(() => {
    const strip = stripRef.current;
    const activeTab = strip?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
    if (strip && activeTab) strip.scrollTo({ left: activeTab.offsetLeft, behavior: "smooth" });
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Stop auto-play permanently so user can read at their own pace
  };

  const arrowControls = (
    <>
      <button type="button" aria-label="Previous specification" onClick={() => handleTabClick((activeIndex - 1 + specifications.length) % specifications.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9d0ca] bg-white text-[#2b2623] transition hover:border-coral hover:bg-coral hover:text-white">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m14 6-6 6 6 6" /></svg>
      </button>
      <button type="button" aria-label="Next specification" onClick={() => handleTabClick((activeIndex + 1) % specifications.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9d0ca] bg-white text-[#2b2623] transition hover:border-coral hover:bg-coral hover:text-white">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m10 6 6 6-6 6" /></svg>
      </button>
    </>
  );

  return (
    <section
      id="specifications"
      className="scroll-mt-20 overflow-hidden bg-[#f3f0ed] py-20 sm:py-24 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Section Header */}
        <div className="relative mb-10 sm:mb-14">
          <div className="mx-auto max-w-[800px] text-center">
            <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
              <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
              <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
                Craftsmanship &amp; Finish · 06
              </span>
              <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
            </div>

            <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
              SPECIFICATIONS
            </h2>
          </div>
        </div>

        <div className="mb-4 hidden justify-end gap-3 md:flex">{arrowControls}</div>

        <div
          ref={stripRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-w-max border-y border-[#d9d0ca]">
            {specifications.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => handleTabClick(index)}
                aria-pressed={index === activeIndex}
                className={`relative min-w-[150px] px-4 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors min-[380px]:text-xs sm:min-w-[190px] sm:px-6 sm:text-base sm:tracking-[0.12em] ${
                  index === activeIndex
                    ? "bg-[#2b2623] text-white"
                    : "text-[#625a55] hover:bg-white hover:text-coral"
                }`}
              >
                <span className="mr-2 text-[9px] text-coral sm:mr-3 sm:text-[10px]">{String(index + 1).padStart(2, "0")}</span>
                {item.title}
                {index === activeIndex && (
                  <span
                    key={`${activeIndex}-${isAutoPlaying}`}
                    className="absolute inset-x-0 bottom-0 h-[3px] bg-coral"
                    style={
                      isAutoPlaying
                        ? {
                            animation: `luminaProgress ${ROTATION_INTERVAL}ms linear`,
                            animationPlayState: isHovered ? "paused" : "running",
                          }
                        : undefined
                    }
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-6 grid overflow-hidden rounded-[28px] bg-white shadow-[0_18px_55px_rgba(71,49,38,0.08)] md:grid-cols-[0.7fr_1.3fr]"
        >
          <div className="flex min-h-[210px] flex-col justify-between bg-[#2b2623] p-7 text-white sm:p-9 md:min-h-[300px] lg:p-12">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-coral">Material detail</span>
              {!isAutoPlaying && (
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(true)}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 transition hover:border-coral hover:text-coral"
                  title="Resume automatic cycle"
                >
                  <span className="text-[9px]">▶</span> Resume
                </button>
              )}
            </div>
            <div>
              <p className="mb-3 text-sm text-white/45">{String(activeIndex + 1).padStart(2, "0")} / {String(specifications.length).padStart(2, "0")}</p>
              <h3 className="text-3xl font-medium sm:text-4xl lg:text-5xl">{specifications[activeIndex].title}</h3>
            </div>
          </div>
          <div className="flex items-center p-7 sm:p-9 lg:p-12">
            <ul key={activeIndex} className="w-full max-w-3xl animate-[luminaReveal_.35s_ease-out] space-y-4">
              {specifications[activeIndex].details.map((detail) => (
                <li key={detail} className="section-description flex gap-4 text-[#5e5752]">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">{arrowControls}</div>
      </div>
    </section>
  );
}

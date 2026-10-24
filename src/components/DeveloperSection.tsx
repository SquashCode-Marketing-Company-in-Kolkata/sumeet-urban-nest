"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MOBILE_QUERY = "(max-width: 639px)";
const CAROUSEL_INTERVAL = 3500;

const landmarkProjects = [
  {
    id: "01",
    name: "Sumeet Trade Centre",
    category: "Commercial Icon",
    location: "Pachpedi Naka, Raipur",
    tagline: "Raipur’s Premier Business Hub",
    description:
      "Raipur’s first ultra-premium corporate business centre, housing premier financial institutions, corporate headquarters, and high-street enterprises.",
    badge: "Corporate Landmark",
  },
  {
    id: "02",
    name: "Sumeet City of Dreams",
    category: "Integrated Township",
    location: "Raipur, Chhattisgarh",
    tagline: "Expansive Master-Planned Community",
    description:
      "A sprawling residential township engineered with open landscape greens, family leisure clubs, and comprehensive lifestyle amenities.",
    badge: "Master Community",
  },
  {
    id: "03",
    name: "Sumeet Landscape",
    category: "Botanical Living",
    location: "Raipur, Chhattisgarh",
    tagline: "Nature-First Luxury Enclave",
    description:
      "A serene residential enclave seamlessly weaving verdant botanical gardens with contemporary architectural craftsmanship.",
    badge: "Botanical Enclave",
  },
  {
    id: "04",
    name: "Sumeet Avenues",
    category: "Commercial Development",
    location: "Raipur, Chhattisgarh",
    tagline: "Seamless Connectivity for Business",
    description:
      "A commercial development designed for convenient city access and modern business needs.",
    badge: "Commercial Spaces",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience", detail: "Creating Spaces That Inspire" },
  { value: "4+", label: "Landmark Addresses", detail: "Commercial & Residential Hubs" },
  { value: "1500+", label: "Happy Families", detail: "Building Homes, Creating Happiness" },
];

export default function DeveloperSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isUserScrollRef = useRef(false);
  const resumeTimeoutRef = useRef<number | undefined>(undefined);

  // Auto-advance the landmark carousel on phones.
  useEffect(() => {
    if (isCarouselPaused || !window.matchMedia(MOBILE_QUERY).matches) return;
    const interval = window.setInterval(() => {
      setActiveProject((index) => (index + 1) % landmarkProjects.length);
    }, CAROUSEL_INTERVAL);
    return () => window.clearInterval(interval);
  }, [isCarouselPaused]);

  // Keep the active card in view, unless the change came from the user swiping.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia(MOBILE_QUERY).matches) return;
    if (isUserScrollRef.current) {
      isUserScrollRef.current = false;
      return;
    }
    const card = track.children[activeProject] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  }, [activeProject]);

  useEffect(() => () => window.clearTimeout(resumeTimeoutRef.current), []);

  const pauseCarousel = () => {
    window.clearTimeout(resumeTimeoutRef.current);
    setIsCarouselPaused(true);
  };

  const resumeCarouselLater = () => {
    window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => setIsCarouselPaused(false), 5000);
  };

  const syncActiveFromScroll = () => {
    const track = trackRef.current;
    if (!track || !isCarouselPaused) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    const nearest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity }).index;
    if (nearest !== activeProject) {
      isUserScrollRef.current = true;
      setActiveProject(nearest);
    }
  };

  return (
    <section
      id="developer"
      className="scroll-mt-20 overflow-hidden bg-[#FAF8F5] pb-20 pt-12 sm:pb-24 sm:pt-14 md:pb-28 md:pt-16 lg:pb-32 lg:pt-20"
    >
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Section Header */}
        <div className="mx-auto mb-14 flex w-full max-w-[1100px] flex-col items-center justify-center text-center sm:mb-18">
          <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
            <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Legacy &amp; Trust · 10
            </span>
            <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
          </div>

          <h2 className="w-full text-center whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            DEVELOPER
          </h2>

          <p className="section-description mx-auto mt-5 max-w-2xl font-light text-[#736c66]">
            A beacon of changing skylines and elevated lifestyles. Rooted in Raipur • Building enduring architectural landmarks for generations.
          </p>
        </div>

        {/* Hero Narrative Canvas */}
        <div className="mb-12 overflow-hidden rounded-[28px] border border-[#2B2623]/8 bg-white shadow-[0_20px_60px_rgba(43,38,35,0.06)] sm:rounded-[36px] lg:mb-16">
          <div className="grid lg:grid-cols-12">
            {/* Left: Brand Identity Box */}
            <div className="flex flex-col justify-between border-b border-[#2B2623]/8 bg-[#FBF9F6] p-8 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
              <div>
                <div className="flex items-center">
                  <Image
                    src="/images/interior/sumeet-infracon-logo.webp"
                    alt="Sumeet Infracon"
                    width={1268}
                    height={1241}
                    className="h-auto w-36 sm:w-44 lg:w-32 object-contain"
                    sizes="(min-width: 640px) 176px, 144px"
                  />
                </div>

                <blockquote className="mt-8 text-xl font-light leading-snug tracking-tight text-[#2B2623] sm:text-2xl lg:mt-6 lg:text-xl">
                  &ldquo;A beacon of changing skylines and elevated lifestyles.&rdquo;
                </blockquote>

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                  Rooted in Raipur • Building for the future
                </p>
              </div>

              <div className="mt-10 border-t border-[#2B2623]/10 pt-5 text-xs text-[#736c66] lg:mt-8 lg:pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-coral">
                  Corporate Headquarters
                </span>
                <p className="mt-1 font-medium text-[#2B2623]">
                  Sumeet Business Park, Pachpedi Naka, Raipur, Chhattisgarh
                </p>
              </div>
            </div>

            {/* Right: Vision Story & Metrics */}
            <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-7 lg:p-10">
              <div className="section-description space-y-4 text-[#615953] lg:space-y-3 lg:text-[14px] lg:leading-6">
                <p className="font-normal text-[#2B2623]">
                  Sumeet Infracon Pvt. Ltd. is a Raipur-based developer known for premium residential and commercial projects, built on quality construction and well-connected locations.
                </p>
                <p>
                  Its landmarks include Sumeet City of Dreams, Sumeet Landscape and Sumeet Trade Centre at Pachpedi Naka, Raipur&apos;s first ultra-premium corporate hub.
                </p>
              </div>

              {/* 4 Architectural Metric Counters */}
              <div className="mt-10 grid grid-cols-1 gap-3 border-t border-[#2B2623]/8 pt-8 sm:grid-cols-3 sm:gap-4 lg:mt-7 lg:pt-6">
                {stats.map((s) => (
                  <div key={s.label} className="min-w-0 rounded-xl bg-[#FAF8F5] p-4 text-left transition hover:bg-white hover:shadow-sm">
                    <p className="text-2xl font-light tracking-tight text-coral sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 break-words text-[10px] font-bold uppercase leading-relaxed tracking-[0.08em] text-[#2B2623]">
                      {s.label}
                    </p>
                    {s.detail && <p className="mt-0.5 break-words text-[10px] leading-relaxed text-[#6E665E]">
                      {s.detail}
                    </p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Milestone Deliveries Showcase */}
        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-coral">
                Track Record
              </span>
              <h3 className="mt-1 text-2xl font-light tracking-tight text-[#2B2623] sm:text-3xl">
                Flagship Regional Landmarks
              </h3>
            </div>
            <p className="text-xs text-[#6E665E]">
              Click any milestone to explore its impact across Raipur
            </p>
          </div>

          {/* 4 Interactive Cards: swipeable auto carousel on phones, grid from sm up */}
          <div
            ref={trackRef}
            onTouchStart={pauseCarousel}
            onTouchEnd={resumeCarouselLater}
            onScroll={syncActiveFromScroll}
            className="relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-4"
          >
            {landmarkProjects.map((project, index) => {
              const isSelected = activeProject === index;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(index)}
                  className={`group relative flex w-[85%] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[24px] border p-6 text-left sm:w-auto transition-all duration-300 sm:p-7 ${
                    isSelected
                      ? "border-coral bg-white shadow-[0_16px_40px_rgba(232,115,74,0.14)] -translate-y-1.5 ring-2 ring-coral/20"
                      : "border-[#2B2623]/10 bg-white/80 hover:-translate-y-1 hover:border-coral/50 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Top Number & Category Pill */}
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold tracking-widest ${isSelected ? "text-coral" : "text-[#6E665E] group-hover:text-coral"}`}>
                        {project.id}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${isSelected ? "bg-coral text-white" : "bg-[#2B2623]/5 text-[#6B635B]"}`}>
                        {project.badge}
                      </span>
                    </div>

                    {/* Project Name & Tagline */}
                    <h4 className="mt-5 text-lg font-semibold tracking-tight text-[#2B2623] group-hover:text-coral transition-colors">
                      {project.name}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-coral/90">
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="section-description mt-3 text-[#6E665E]">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Location */}
                  <div className="mt-6 flex items-center gap-1.5 border-t border-[#2B2623]/8 pt-4 text-[11px] font-medium text-[#6E665E]">
                    <span className="text-coral">📍</span>
                    <span>{project.location}</span>
                  </div>

                  {/* Active highlight line */}
                  {isSelected && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-coral" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Carousel position dots (phones only) */}
          <div className="mt-4 flex justify-center gap-1 sm:hidden">
            {landmarkProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProject(index)}
                aria-label={`Show ${project.name}`}
                aria-current={activeProject === index ? "true" : undefined}
                className="flex h-6 min-w-6 items-center justify-center"
              >
                <span className={`h-2 rounded-full transition-all duration-300 ${activeProject === index ? "w-6 bg-coral" : "w-2 bg-[#2B2623]/20"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

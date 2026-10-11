"use client";

import Image from "next/image";
import { useWalkthroughVideo } from "@/components/WalkthroughVideo";

export default function WalkthroughSection() {
  const openVideo = useWalkthroughVideo();

  return (
    <section
      id="walkthrough"
      className="relative scroll-mt-20 overflow-hidden bg-[#FFF0DE] py-20 sm:py-24 md:py-32 lg:py-36"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Top Editorial Header */}
        <div className="mx-auto mb-10 max-w-[1100px] text-center sm:mb-14 md:mb-16">
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-3">
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Architectural Experience · 04
            </span>
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
          </div>

          <h2 className="whitespace-nowrap text-[13px] min-[380px]:text-[15px] sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.14em] min-[380px]:tracking-[0.18em] sm:tracking-[0.28em] text-coral uppercase">
            W A L K T H R O U G H
          </h2>
        </div>

        {/* Central Immersive Media Showcase */}
        <div className="relative mx-auto w-full">
          {/* Subtle architectural frame accent lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 hidden rounded-[36px] border border-coral/15 sm:block md:-inset-4 md:rounded-[42px]"
          />

          <div
            className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#2c2b29]/15 bg-[#1a1715] shadow-[0_25px_70px_-15px_rgba(83,55,39,0.22)] sm:aspect-[16/9] sm:rounded-3xl md:rounded-[32px]"
          >
            {/* The Main Project Image */}
            <Image
              src="/images/exterior/podium-top-view.webp"
              alt="Podium garden walkthrough at Sumeet Urban Nest"
              fill
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
              sizes="(min-width: 1920px) 1600px, 94vw"
              priority
            />

            {/* Subtle cinematic gradient vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35 transition-opacity duration-700 group-hover:from-black/60" />

            {/* Top-corner metadata badges */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6 md:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                Podium &amp; Sky Tour
              </span>
              <span className="hidden rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur-md sm:inline-block sm:text-[11px]">
                4K Ultra View
              </span>
            </div>

            {/* Redesigned Circular Luxury Play Control */}
            <button
              type="button"
              aria-label="Play walkthrough video"
              onClick={openVideo}
              className="group/btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-coral/50"
            >
              {/* Outer pulsing ring */}
              <div className="relative flex items-center justify-center">
                <span className="absolute h-24 w-24 rounded-full border border-coral/30 bg-coral/5 animate-ping opacity-35 sm:h-32 sm:w-32 md:h-40 md:w-40 pointer-events-none" />

                {/* Outer Glass Aura */}
                <span className="absolute h-24 w-24 rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-500 ease-out group-hover/btn:scale-110 group-hover/btn:border-coral/40 group-hover/btn:bg-coral/15 sm:h-32 sm:w-32 md:h-40 md:w-40" />

                {/* Precision Mid Ring */}
                <span className="absolute h-20 w-20 rounded-full border border-white/50 transition-all duration-500 ease-out group-hover/btn:scale-105 group-hover/btn:border-white/80 sm:h-28 sm:w-28 md:h-34 md:w-34" />

                {/* Core Play Button */}
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-all duration-500 ease-out group-hover/btn:scale-95 group-hover/btn:border-coral group-hover/btn:bg-coral group-hover/btn:shadow-[0_0_40px_rgba(232,115,74,0.6)] sm:h-22 sm:w-22 md:h-26 md:w-26">
                  <svg
                    className="ml-1 h-7 w-7 fill-white text-white drop-shadow-md transition-transform duration-300 group-hover/btn:scale-110 sm:h-9 sm:w-9 md:h-11 md:w-11"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>

              {/* Floating Label */}
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover/btn:border-coral group-hover/btn:bg-black/70 group-hover/btn:text-white sm:mt-5 sm:px-4 sm:py-1.5 sm:text-[11px]">
                Press To Play
              </span>
            </button>
          </div>
        </div>

        {/* Editorial Bottom Composition */}
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
          <div className="grid gap-6 border-t border-[#2c2b29]/15 pt-8 sm:gap-8 sm:pt-10 md:grid-cols-12 md:items-start md:gap-10">
            {/* Left Headline: Witness how CENTRAL RAIPUR OPENS OUT TO LIFE */}
            <div className="md:col-span-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-coral sm:text-xs">
                Elevated Living
              </span>
              <h3 className="mt-2 text-xl font-light leading-snug tracking-[-0.015em] text-[#2c2b29] sm:text-2xl md:text-3xl lg:text-[34px]">
                <span className="block font-extralight text-[#6d625c]">
                  Witness how
                </span>
                <span className="font-semibold text-coral">
                  Central Raipur
                </span>{" "}
                opens out to life.
              </h3>
            </div>

            {/* Right Editorial Narrative */}
            <div className="flex flex-col justify-between gap-4 md:col-span-5 md:pt-1">
              <p className="section-description font-normal text-[#5c544e]">
                Step into Raipur’s first BOHK residences through an elevated visual tour across 1.76 acres of lush landscaped podium greens, rooftop recreation, and skyward towers at Khamardih, Shankar Nagar.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d7168]">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  1.76 Acre Enclave
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  3 Towers
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  Podium Greens
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

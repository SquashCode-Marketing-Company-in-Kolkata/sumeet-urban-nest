"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

export type LuminaSlide = {
  title: string;
  description: string;
  media: string;
  category?: "interior" | "exterior";
};

export function LuminaInteractiveList({
  slides,
  onOpen,
  footer,
}: {
  slides: LuminaSlide[];
  onOpen?: (index: number) => void;
  footer?: ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState<"all" | "interior" | "exterior">("all");
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);

  const filteredSlides =
    activeCategory === "all"
      ? slides
      : slides.filter((s) => s.category === activeCategory);

  const interiorCount = slides.filter((s) => s.category === "interior").length;
  const exteriorCount = slides.filter((s) => s.category === "exterior").length;

  return (
    <div className="overflow-hidden bg-white pb-0 pt-16 text-[#292522] sm:pt-18 lg:pt-20">
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-[800px] text-center sm:mb-12">
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-3">
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Visual Portfolio · 03
            </span>
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
          </div>

          <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            GALLERY
          </h2>
        </div>

        {/* Filter Categories */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:mb-14 sm:gap-3">
          {[
            { id: "all", label: `All Views (${slides.length})` },
            { id: "interior", label: `Interior Spaces (${interiorCount})` },
            { id: "exterior", label: `Exterior Architecture (${exteriorCount})` },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as "all" | "interior" | "exterior")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#292522] text-white shadow-md"
                  : "border border-[#292522]/20 bg-white/40 text-[#292522]/75 hover:border-coral hover:bg-white hover:text-coral"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-4 grid-flow-dense">
          {filteredSlides.map((slide, index) => {
            const originalIndex = slides.findIndex((s) => s.media === slide.media);
            const isHero = index === 0 || index === 7;
            const isWide = index === 1 || index === 8;
            const isFinalAllViewsPair =
              activeCategory === "all" && index >= filteredSlides.length - 2;

            return (
              <button
                key={slide.media}
                type="button"
                onClick={() => onOpen?.(originalIndex >= 0 ? originalIndex : index)}
                onMouseEnter={(event) => setCursorPosition({ x: event.clientX, y: event.clientY })}
                onMouseMove={(event) => setCursorPosition({ x: event.clientX, y: event.clientY })}
                onMouseLeave={() => setCursorPosition(null)}
                aria-label={`Open ${slide.title}`}
                className={`group relative cursor-none overflow-hidden rounded-xl bg-[#1b1816] text-left transition duration-500 ${
                  isHero
                    ? "sm:row-span-2 lg:col-span-2"
                    : isWide || isFinalAllViewsPair
                      ? "lg:col-span-2"
                      : ""
                }`}
              >
                <Image
                  src={slide.media}
                  alt={slide.title}
                  fill
                  sizes={isHero ? "(min-width: 1024px) 50vw, (max-width: 1080px) 100vw, 1080px" : "(min-width: 1024px) 25vw, (max-width: 1080px) 50vw, 540px"}
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-colors group-hover:from-black/85" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6 max-md:gap-2 max-md:p-4">
                  <span className="min-w-0">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                      {String((originalIndex >= 0 ? originalIndex : index) + 1).padStart(2, "0")} · {slide.category?.toUpperCase() || "GALLERY"}
                    </span>
                    <span className={`${isHero ? "text-3xl sm:text-4xl" : "text-xl"} block font-light tracking-wide text-white max-md:truncate max-md:text-sm max-md:tracking-normal`}>
                      {slide.title}
                    </span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/45 text-lg text-white transition group-hover:border-coral group-hover:bg-coral max-md:h-7 max-md:w-7">
                    +
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {footer && <div className="mt-8 pb-8 text-center sm:mt-10 sm:pb-10">{footer}</div>}

        {cursorPosition && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed z-[60] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#E8734A]/95 text-[10px] font-semibold tracking-[0.2em] text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm lg:flex"
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
          >
            VIEW
          </div>
        )}
      </div>
    </div>
  );
}

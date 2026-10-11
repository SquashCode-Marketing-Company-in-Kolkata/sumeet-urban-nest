"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const amenities = [
  { id: 1, name: "Entry/Exit", x: 82.4, y: 53.6 },
  { id: 2, name: "Driveway", x: 35.5, y: 26.9, additionalMarkers: [{ x: 44, y: 54.2 }, { x: 78, y: 54.2 }] },
  { id: 3, name: "Temple", x: 78, y: 45 },
  { id: 4, name: "Drop Off", x: 63, y: 54.2, additionalMarkers: [{ x: 37.1, y: 72.9 }] },
  { id: 5, name: "Kids' Play Area", x: 17.6, y: 63.5 },
  { id: 6, name: "Pergola Seating Area", x: 16.5, y: 58 },
  { id: 7, name: "Pavilion", x: 16.9, y: 41.8 },
  { id: 8, name: "Peripheral Greens", x: 21.8, y: 18.8, additionalMarkers: [{ x: 51.4, y: 23.1 }, { x: 27.6, y: 92.6 }] },
  { id: 9, name: "Podium", x: 30.7, y: 53.3 },
  { id: 10, name: "Swimming Pool", x: 50.8, y: 46.3 },
  { id: 11, name: "Kids' Pool", x: 49.2, y: 42.6 },
  { id: 12, name: "Pool Deck", x: 53.5, y: 42.5 },
  { id: 13, name: "Senior Citizens' Seating Zone", x: 44.7, y: 46.8 },
  { id: 14, name: "Outdoor Seating Area", x: 51.5, y: 33.7 },
  { id: 15, name: "Multipurpose Area", x: 54.8, y: 34.6 },
  { id: 16, name: "Lounge Area", x: 51.3, y: 40.2 },
  { id: 17, name: "Hobby Space", x: 58.3, y: 38 },
  { id: 18, name: "Changing Rooms", x: 58.5, y: 47.4 },
  { id: 19, name: "Gymnasium", x: 65, y: 41.1 },
  { id: 20, name: "Yoga Room", x: 61.4, y: 35.3 },
  { id: 21, name: "Indoor Games Area", x: 22.7, y: 40.2 },
  { id: 22, name: "Mini Theatre", x: 25.2, y: 35 },
  { id: 23, name: "Multipurpose Hall", x: 35.5, y: 35 },
];

const mapMarkers = amenities.flatMap((amenity) =>
  [{ x: amenity.x, y: amenity.y }, ...(amenity.additionalMarkers ?? [])].map((position, index) => ({
    ...amenity,
    ...position,
    markerKey: `${amenity.id}-${index}`,
  })),
);

function MasterPlanExperience({ fullscreen = false, onClose }: { fullscreen?: boolean; onClose?: () => void }) {
  const [activeAmenity, setActiveAmenity] = useState<number | null>(null);
  const [activeMarker, setActiveMarker] = useState<{ id: number; x: number; y: number } | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const active = amenities.find((item) => item.id === activeAmenity);
  const tooltipPosition = activeMarker?.id === activeAmenity ? activeMarker : active;
  const group1 = amenities.slice(0, 12);
  const group2 = amenities.slice(12);

  const selectFromLegend = (id: number) => {
    setActiveMarker(null);
    setActiveAmenity(id);
    setLegendOpen(false);
    if (!fullscreen) {
      window.setTimeout(() => mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    }
  };

  const renderLegendItem = (item: { id: number; name: string }) => {
    const isActive = activeAmenity === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onMouseEnter={() => { setActiveMarker(null); setActiveAmenity(item.id); }}
        onMouseLeave={() => setActiveAmenity(null)}
        onFocus={() => { setActiveMarker(null); setActiveAmenity(item.id); }}
        onBlur={() => setActiveAmenity(null)}
        onClick={() => selectFromLegend(item.id)}
        className={`flex h-[38px] xl:h-[42px] w-full items-center gap-2 border-b border-[#2B2623]/8 px-2.5 xl:px-3 text-left transition ${
          isActive ? "bg-coral/20" : "hover:bg-white/80"
        }`}
      >
        <span
          className={`flex h-4 w-4 xl:h-[18px] xl:w-[18px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition ${
            isActive ? "bg-coral text-white" : "bg-coral/10 text-coral"
          }`}
        >
          {String(item.id).padStart(2, "0")}
        </span>
        <span
          className={`truncate text-[10px] xl:text-[11px] leading-tight ${
            isActive ? "font-bold text-[#2B2623]" : "font-medium text-[#2B2623]/80"
          }`}
          title={item.name}
        >
          {item.name}
        </span>
      </button>
    );
  };

  return (
    <div className={`relative overflow-hidden ${fullscreen ? "flex h-screen items-center bg-[#2B2623]" : "bg-[#F7F5F0]"}`}>
      <div ref={mapRef} className="relative w-full">
        <Image src="/images/exterior/top-view.webp" alt="Sumeet Urban Nest aerial master plan" width={1920} height={1080} priority className="block h-auto w-full" sizes="100vw" />
        <div className="absolute left-3 top-3 bg-[#2B2623]/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">Aerial master plan</div>

        {mapMarkers.map((item) => {
          const isActive = activeAmenity === item.id;
          return (
            <button
              key={item.markerKey}
              type="button"
              aria-label={item.name}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onMouseEnter={() => { setActiveMarker(item); setActiveAmenity(item.id); }}
              onMouseLeave={() => setActiveAmenity(null)}
              onFocus={() => { setActiveMarker(item); setActiveAmenity(item.id); }}
              onBlur={() => setActiveAmenity(null)}
              onClick={() => { setActiveMarker(item); setActiveAmenity(isActive ? null : item.id); }}
              className={`absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[8px] font-semibold text-white shadow-md transition duration-200 sm:h-7 sm:w-7 sm:text-[10px] lg:h-8 lg:w-8 lg:text-xs ${isActive ? "z-40 scale-125 border-white bg-coral ring-4 ring-coral/40" : "z-20 border-coral bg-[#2B2623] hover:scale-[1.15]"}`}
            >
              {String(item.id).padStart(2, "0")}
            </button>
          );
        })}

        {active && tooltipPosition && (
          <div style={{ left: `${tooltipPosition.x}%`, top: `${tooltipPosition.y}%` }} className="pointer-events-none absolute z-30 hidden -translate-x-1/2 translate-y-6 whitespace-nowrap border border-coral/60 bg-[#2B2623]/95 px-3 py-2 text-[11px] font-medium text-white shadow-lg sm:block">
            {active.name}
          </div>
        )}

        {/* Twin Square Legend Boxes (01–12 & 13–23) */}
        <aside className="absolute bottom-[2.5%] right-[8%] xl:bottom-[3%] xl:right-[10%] 2xl:right-[12%] z-30 hidden lg:flex items-end gap-2.5 xl:gap-3.5">
          {/* Box 1: Podium & Outdoors (01–12) */}
          <div className="w-[275px] xl:w-[305px] 2xl:w-[320px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F5F0]/95 shadow-[0_16px_40px_rgba(43,38,35,0.22)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-[#2B2623]/12 px-3 py-2 xl:px-3.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#2B2623]">
                  Legend · 01–12
                </p>
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-coral">
                Podium & Greens
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#2B2623]/10">
              <div className="flex flex-col">
                {group1.slice(0, 6).map(renderLegendItem)}
              </div>
              <div className="flex flex-col">
                {group1.slice(6, 12).map(renderLegendItem)}
              </div>
            </div>
          </div>

          {/* Box 2: Club & Wellness (13–23) */}
          <div className="w-[275px] xl:w-[305px] 2xl:w-[320px] overflow-hidden rounded-xl border border-white/60 bg-[#F7F5F0]/95 shadow-[0_16px_40px_rgba(43,38,35,0.22)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-[#2B2623]/12 px-3 py-2 xl:px-3.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#2B2623]">
                  Legend · 13–23
                </p>
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-coral">
                Club & Wellness
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#2B2623]/10">
              <div className="flex flex-col">
                {group2.slice(0, 6).map(renderLegendItem)}
              </div>
              <div className="flex flex-col">
                {group2.slice(6).map(renderLegendItem)}
                {/* 12th Slot in 6x2 grid: Clear selection or Status badge */}
                {active ? (
                  <button
                    type="button"
                    onClick={() => setActiveAmenity(null)}
                    className="flex h-[38px] xl:h-[42px] w-full items-center justify-center gap-1.5 bg-coral/15 px-2 text-[10px] font-bold uppercase tracking-wider text-coral transition hover:bg-coral hover:text-white"
                  >
                    <span>Clear #{String(active.id).padStart(2, "0")}</span>
                    <span className="text-xs">✕</span>
                  </button>
                ) : (
                  <div className="flex h-[38px] xl:h-[42px] w-full items-center justify-center border-b border-transparent px-2 text-[9px] font-semibold uppercase tracking-wider text-[#2B2623]/40">
                    All 23 Highlights
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        <div className="absolute bottom-3 right-3 z-30 flex gap-2 lg:hidden">
          <button type="button" onClick={() => setLegendOpen(true)} className="border border-coral bg-[#F7F5F0]/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#2B2623] shadow-lg">View legend</button>
        </div>

        {active && <div className="absolute bottom-3 left-3 z-30 max-w-[65%] border border-coral bg-[#F7F5F0]/95 px-4 py-3 shadow-lg sm:hidden"><p className="text-[10px] font-bold text-coral">{String(active.id).padStart(2, "0")}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#2B2623]">{active.name}</p></div>}
      </div>

      {legendOpen && (
        <div className="fixed inset-0 z-[110] flex items-end bg-[#2B2623]/55 lg:hidden" onClick={() => setLegendOpen(false)}>
          <div className="max-h-[75vh] w-full overflow-y-auto rounded-t-xl bg-[#F7F5F0] pb-6 shadow-2xl masterplan-scrollbar" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2B2623]/15 bg-[#F7F5F0]/95 px-5 py-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-coral" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2B2623]">Master Plan Legend</p>
              </div>
              <button type="button" onClick={() => setLegendOpen(false)} aria-label="Close legend" className="text-2xl leading-none text-[#2B2623]">×</button>
            </div>

            {/* Zone 1: 01-12 */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral">01–12 · Podium & Greens</p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-[#2B2623]/10 border-t border-b border-[#2B2623]/10 sm:grid-cols-2">
              {group1.map((item) => (
                <button key={item.id} type="button" onClick={() => selectFromLegend(item.id)} className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${activeAmenity === item.id ? "bg-coral/15" : "hover:bg-white/80"}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/10 text-[10px] font-bold text-coral">{String(item.id).padStart(2, "0")}</span>
                  <span className="text-xs font-medium text-[#2B2623]">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Zone 2: 13-23 */}
            <div className="px-5 pt-5 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral">13–23 · Club & Wellness</p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-[#2B2623]/10 border-t border-b border-[#2B2623]/10 sm:grid-cols-2">
              {group2.map((item) => (
                <button key={item.id} type="button" onClick={() => selectFromLegend(item.id)} className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${activeAmenity === item.id ? "bg-coral/15" : "hover:bg-white/80"}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/10 text-[10px] font-bold text-coral">{String(item.id).padStart(2, "0")}</span>
                  <span className="text-xs font-medium text-[#2B2623]">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {fullscreen && <button type="button" onClick={onClose} aria-label="Close fullscreen master plan" className="fixed right-5 top-5 z-[120] flex h-11 w-11 items-center justify-center border border-white/40 bg-[#2B2623]/80 text-2xl text-white shadow-lg">×</button>}
    </div>
  );
}

export default function PlanSection() {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setFullscreen(false);
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [fullscreen]);

  return (
    <section id="plan" className="scroll-mt-20 bg-white pt-14 pb-4 md:pt-24 md:pb-10">
      <div className="mx-auto mb-10 w-full max-w-[1720px] px-6 sm:px-10 md:px-14 md:mb-14 lg:px-20 xl:px-28 2xl:px-36">
        <div className="flex items-end justify-between gap-3 sm:gap-5">
          <div>
            {/* Top Editorial Eyebrow */}
            <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
              <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
              <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
                Architectural Layout · 05
              </span>
            </div>

            <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
              M A S T E R &nbsp; P L A N
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label="Expand fullscreen master plan"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2B2623]/25 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2B2623] transition hover:border-coral hover:bg-coral hover:text-white md:h-auto md:w-auto md:px-5 md:py-2.5 md:text-xs"
          >
            <svg className="h-4 w-4 md:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
            </svg>
            <span className="hidden md:inline">Expand Fullscreen</span>
          </button>
        </div>
      </div>
      <MasterPlanExperience />
      {fullscreen && <div className="fixed inset-0 z-[100] bg-[#2B2623]"><MasterPlanExperience fullscreen onClose={() => setFullscreen(false)} /></div>}
    </section>
  );
}

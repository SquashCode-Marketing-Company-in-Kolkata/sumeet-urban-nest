"use client";

import { useEffect, useState } from "react";
import FloorPlanPdfViewer from "@/components/FloorPlanPdfViewer";

const floorPlanPdf = "/downloads/urban-nest-floor-plan-brochure.pdf";

export default function FloorPlanSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <section id="floor-plan" className="scroll-mt-20 bg-[#F7F5F0] py-14 sm:py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
              <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#2c2b29] sm:text-xs sm:tracking-[0.32em]">Architectural Layout</span>
              <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
            </div>
            <h2 className="text-[13px] font-light tracking-[0.14em] text-coral uppercase min-[380px]:text-[15px] min-[380px]:tracking-[0.18em] sm:text-2xl sm:tracking-[0.28em] md:text-3xl lg:text-4xl">
              FLOOR PLANS
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6d625c] sm:text-base">
              Explore the detailed floor-plan brochure for Sumeet Urban Nest.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1420px] sm:mt-10">
          <button type="button" onClick={() => setIsOpen(true)} className="group block w-full text-left" aria-label="View floor plan brochure">
            <div className="overflow-hidden rounded-[20px] bg-white transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_42px_rgba(43,38,35,0.14)] sm:rounded-[28px]">
              <FloorPlanPdfViewer src={floorPlanPdf} maxPages={1} />
            </div>
            <span className="mx-auto mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[#2B2623]/20 bg-transparent px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2B2623] transition group-hover:border-coral group-hover:bg-coral group-hover:text-white sm:text-xs">
              View Floor Plans
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#2B2623]/70 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label="Floor plan brochure" onClick={() => setIsOpen(false)}>
          <div className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-[22px] bg-[#F7F5F0] p-3 shadow-2xl sm:rounded-[30px] sm:p-5" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close floor plan brochure" className="sticky top-0 z-10 ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#2B2623] text-2xl leading-none text-white shadow-lg transition hover:bg-coral">&times;</button>
            <div className="pb-2 pt-1 sm:px-3 sm:pb-4">
              <FloorPlanPdfViewer src={floorPlanPdf} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

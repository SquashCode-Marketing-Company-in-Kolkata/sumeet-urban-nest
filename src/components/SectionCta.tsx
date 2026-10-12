"use client";

import { EnquiryButton } from "@/components/EnquiryPanel";

type SectionCtaProps = {
  label?: "Enquire Now" | "Schedule a Site Visit" | "Download Brochure";
};

const buttonClassName = "group inline-flex min-h-11 items-center gap-3 rounded-full bg-coral px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_26px_rgba(232,115,74,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-coral-dark hover:shadow-[0_14px_30px_rgba(232,115,74,0.38)] focus:outline-none focus:ring-4 focus:ring-coral/20";

export default function SectionCta({ label = "Enquire Now" }: SectionCtaProps) {
  const content = (
    <>
      {label}
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h13m-5-5 5 5-5 5" />
      </svg>
    </>
  );

  return (
    <EnquiryButton
      ariaLabel={label}
      ctaLabel={label}
      className={buttonClassName}
    >
      {content}
    </EnquiryButton>
  );
}

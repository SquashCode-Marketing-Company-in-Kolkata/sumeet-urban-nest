"use client";

import { useLeadSubmission } from "@/components/useLeadSubmission";

import { useState, type FormEvent } from "react";

import ConfigurationBudgetFields from "@/components/ConfigurationBudgetFields";
import { getLeadTracking, redirectToThankYou } from "@/lib/leadTracking";

export default function Home2LeadForm({ fieldClassName }: { fieldClassName: string }) {
  const submitLead = useLeadSubmission();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phoneNumber = String(data.get("phoneNumber") ?? "").replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(phoneNumber.slice(-10))) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const response = await submitLead({
          fullName: String(data.get("fullName") ?? "").trim(),
          phoneNumber: `+91${phoneNumber.slice(-10)}`,
          configuration: String(data.get("interest") ?? ""),
          budget: String(data.get("budget") ?? ""),
          form: "home-2",
          ...getLeadTracking(),
        });

      if (!response.ok) throw new Error("Enquiry submission failed");
      redirectToThankYou();
    } catch {
      setError("We could not submit your enquiry. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <div>
        <label htmlFor="home2-name" className="mb-1.5 block text-[11px] font-semibold text-[#514c46]">Full name</label>
        <input required id="home2-name" name="fullName" type="text" autoComplete="name" placeholder="Enter your name" className={fieldClassName} />
      </div>
      <div>
        <label htmlFor="home2-phone" className="mb-1.5 block text-[11px] font-semibold text-[#514c46]">Mobile number</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#302c2a]/55">+91</span>
          <input required id="home2-phone" name="phoneNumber" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} pattern="[0-9]{10}" placeholder="98765 43210" className={`${fieldClassName} pl-13`} />
        </div>
      </div>
      <ConfigurationBudgetFields fieldClassName={fieldClassName} />
      <label className="flex items-start gap-2 text-xs leading-5 text-[#514c46]">
        <input required type="checkbox" name="contactConsent" className="mt-1 accent-[#E8734A]" />
        <span>I agree to be contacted about this project and have read the <a href="/privacy-policy" className="font-semibold text-coral underline">Privacy Policy</a>.</span>
      </label>
      <button type="submit" disabled={isSubmitting} className="group flex min-h-13 w-full items-center justify-between rounded-lg bg-coral px-5 text-sm font-bold tracking-[0.04em] text-white shadow-[0_10px_24px_rgba(232,115,74,0.24)] transition hover:-translate-y-0.5 hover:bg-coral-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral disabled:opacity-70 sm:min-h-14 sm:px-6">
        {isSubmitting ? "SUBMITTING..." : "REVEAL THE PRICE"}
        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
      </button>
      <p className="flex items-start justify-center gap-1.5 pt-1 text-center text-[10px] leading-4 text-[#8a8279]">
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-3.5 w-3.5 shrink-0"><rect x="4" y="8" width="12" height="9" rx="2"/><path d="M7 8V6a3 3 0 0 1 6 0v2"/></svg>
        Your details are used to respond to your enquiry.
      </p>
    </form>
  );
}

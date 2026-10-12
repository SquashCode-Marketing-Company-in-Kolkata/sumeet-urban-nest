"use client";

import { useLeadSubmission } from "@/components/useLeadSubmission";

import { useEffect, useState, type FormEvent } from "react";

import { getLeadTracking, redirectToThankYou } from "@/lib/leadTracking";
import SelectChevron from "@/components/SelectChevron";
import { useEnquiry } from "@/components/EnquiryPanel";

type Errors = Partial<Record<"name" | "phone" | "budget" | "bhk" | "pincode" | "form", string>>;

const inputClassName =
  "h-12 min-w-0 rounded-full border border-[#2B2623]/15 bg-white/85 px-4 text-sm text-[#2B2623] outline-none transition placeholder:text-[#2B2623]/45 focus:border-coral focus:ring-2 focus:ring-coral/15";

export default function SiteVisitBar() {
  const submitLead = useLeadSubmission();
  const { openEnquiry } = useEnquiry();

  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [configuration, setConfiguration] = useState("");
  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");
      if (!hero || !contact) return;

      const heroPassed = hero.getBoundingClientRect().bottom <= 90;
      const contactReached = contact.getBoundingClientRect().top <= window.innerHeight * 0.9;
      setIsVisible(heroPassed && !contactReached);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    const budget = String(data.get("budget") ?? "");
    const bhk = configuration;
    const pincode = String(data.get("pincode") ?? "").trim();
    const nextErrors: Errors = {};

    if (name.length < 2) nextErrors.name = "Enter your name";
    if (!/^[6-9]\d{9}$/.test(phone.slice(-10))) nextErrors.phone = "Enter a valid 10-digit phone";
    if (!budget) nextErrors.budget = "Select your budget";
    if (!bhk) nextErrors.bhk = "Select Configuration";
    if (pincode && !/^\d{6}$/.test(pincode)) nextErrors.pincode = "Enter a valid 6-digit pincode";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      const response = await submitLead({ fullName: name, phoneNumber: `+91${phone.slice(-10)}`, budget, configuration: bhk, locationPincode: pincode, form: "site-visit", ...getLeadTracking() });
      if (response.ok) {
        setIsSubmitted(true);
        redirectToThankYou();
      } else {
        setErrors({ form: "We could not submit your enquiry. Please try again." });
      }
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <aside className="site-visit-bar fixed inset-x-6 bottom-4 z-[90] mx-auto max-w-[1360px] animate-[enquiry-sheet-in_340ms_cubic-bezier(0.22,1,0.36,1)] sm:inset-x-10 sm:bottom-5 md:inset-x-14 lg:inset-x-16 xl:inset-x-16" aria-label="Book a site visit">
      <div className="lg:rounded-full lg:border lg:border-white/50 lg:bg-[#F8F7F3]/95 lg:shadow-[0_14px_40px_rgba(43,38,35,0.22)] lg:backdrop-blur-xl">
        <div className="relative flex items-center gap-2 lg:min-h-[68px] lg:gap-2.5 lg:px-3 lg:py-2">
          <div aria-hidden="true" className="pointer-events-none hidden w-[230px] shrink-0 items-center justify-start gap-2.5 text-left xl:flex">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5L3 8Z"/><path strokeLinecap="round" d="M5 21h14"/></svg>
            </span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-[11px] font-bold tracking-[0.08em] text-[#2B2623]">FIRST 25 BOOKINGS</span>
              <span className="mt-0.5 block whitespace-nowrap text-[10px] font-medium text-[#2B2623]/65">70% on possession · 30% now</span>
            </span>
          </div>

          <div className="relative mx-auto lg:hidden">
            <button type="button" onClick={() => openEnquiry("Download Brochure")} className="flex h-9 items-center justify-center whitespace-nowrap rounded-full bg-coral px-5 text-[10px] font-bold tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(232,115,74,0.38)] transition active:scale-[0.98]">DOWNLOAD BROCHURE</button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              aria-label="Close site visit form"
              className="absolute -right-1.5 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#2B2623]/10 bg-white text-[15px] leading-none text-[#2B2623]/70 shadow-[0_4px_12px_rgba(43,38,35,0.25)] transition after:absolute after:-inset-2.5 active:scale-95"
            >
              ×
            </button>
          </div>

          {isSubmitted ? (
            <div className="hidden flex-1 items-center justify-center gap-3 text-sm font-semibold text-[#2B2623] lg:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral/10 text-coral">✓</span>
              Thank you. Our team will confirm your visit shortly.
            </div>
          ) : (
            <form onSubmit={submit} className="site-visit-form hidden min-w-0 flex-1 flex-wrap items-center gap-2 lg:flex">
              {errors.form && <p role="alert" className="order-first w-full text-center text-xs font-medium text-red-700">{errors.form}</p>}
              <Field name="name" placeholder="Name" autoComplete="name" error={errors.name} className={`${inputClassName} w-full`} wrapperClassName="min-w-[120px] flex-1" />
              <Field name="phone" placeholder="98765 43210" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} pattern="[0-9]{10}" countryCode error={errors.phone} className={`${inputClassName} w-full`} wrapperClassName="min-w-[120px] flex-1" />
              <label className="relative order-4 w-[150px] min-w-[150px] shrink-0">
                <span className="sr-only">Your Budget</span>
                <select
                  name="budget"
                  key={configuration}
                  defaultValue=""
                  disabled={!configuration}
                  aria-invalid={Boolean(errors.budget)}
                  className={`${inputClassName} w-full appearance-none pr-7 disabled:cursor-not-allowed disabled:opacity-55 ${errors.budget ? "border-red-500" : ""}`}
                >
                  <option value="" disabled>Your Budget</option>
                  {configuration === "2-bohk" && <><option value="2-bohk-55-60">₹55L–₹60L</option><option value="2-bohk-60-65-plus">₹60L–₹65L+</option></>}
                  {configuration === "3-bohk" && <><option value="3-bohk-85-90">₹85L–₹90L</option><option value="3-bohk-90-95">₹90L–₹95L</option><option value="3-bohk-95-1cr-plus">₹95L–₹1Cr+</option></>}
                  {configuration === "not-sure" && <><option value="2-bohk-55-60">2 BHK: ₹55L–₹60L</option><option value="2-bohk-60-65-plus">2 BHK: ₹60L–₹65L+</option><option value="3-bohk-85-90">3 BHK: ₹85L–₹90L</option><option value="3-bohk-90-95">3 BHK: ₹90L–₹95L</option><option value="3-bohk-95-1cr-plus">3 BHK: ₹95L–₹1Cr+</option></>}
                </select>
                <SelectChevron compact />
                {errors.budget && <span className="mt-1 block pl-3 text-[9px] text-red-600 lg:absolute lg:left-3 lg:top-full lg:whitespace-nowrap lg:pl-0">{errors.budget}</span>}
              </label>
              <div className="relative order-3 w-[150px] min-w-[150px] shrink-0 xl:w-[160px]">
                <button
                  type="button"
                  onClick={() => setIsConfigurationOpen((open) => !open)}
                  aria-expanded={isConfigurationOpen}
                  aria-haspopup="listbox"
                  className={`${inputClassName} flex w-full items-center justify-between gap-2 text-left ${errors.bhk ? "border-red-500" : ""}`}
                >
                  <span className={`whitespace-nowrap ${configuration ? "text-[#2B2623]" : "text-[#2B2623]/45"}`}>{configuration === "2-bohk" ? "2 BHK" : configuration === "3-bohk" ? "3 BHK" : configuration === "not-sure" ? "Not Sure" : "Configuration"}</span>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-coral/15 bg-coral/10 text-coral transition-transform ${isConfigurationOpen ? "rotate-180" : ""}`}>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="m7 9 5 5 5-5" /></svg>
                  </span>
                </button>
                {isConfigurationOpen && (
                  <div role="listbox" aria-label="Select Configuration" className="absolute bottom-[calc(100%+8px)] left-0 z-[100] w-full overflow-hidden rounded-xl border border-[#2B2623]/10 bg-white p-1.5 shadow-[0_14px_30px_rgba(43,38,35,0.2)]">
                    {[{ value: "2-bohk", label: "2 BHK" }, { value: "3-bohk", label: "3 BHK" }, { value: "not-sure", label: "Not Sure" }].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={configuration === option.value}
                        onClick={() => { setConfiguration(option.value); setIsConfigurationOpen(false); }}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition hover:bg-[#fff2ea] ${configuration === option.value ? "bg-[#fff2ea] font-semibold text-coral" : "text-[#2B2623]"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
                {errors.bhk && <span className="mt-1 block pl-3 text-[9px] text-red-600 lg:absolute lg:left-3 lg:top-full lg:whitespace-nowrap lg:pl-0">{errors.bhk}</span>}
              </div>
              <Field name="pincode" placeholder="Pincode (optional)" inputMode="numeric" autoComplete="postal-code" error={errors.pincode} required={false} className={`${inputClassName} w-full`} wrapperClassName="order-5 w-[120px] min-w-[120px] shrink-0" />
              <button
                type="submit"
                className="group order-6 flex h-12 w-[210px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-coral px-4 text-[11px] font-bold tracking-[0.06em] text-white shadow-[0_10px_26px_rgba(232,115,74,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-coral-dark hover:shadow-[0_14px_30px_rgba(232,115,74,0.38)] focus:outline-none focus:ring-4 focus:ring-coral/20 lg:w-[168px] xl:w-[180px]"
              >
                DOWNLOAD BROCHURE
              </button>
            </form>
          )}

          <button type="button" onClick={() => setIsDismissed(true)} aria-label="Close site visit form" className="hidden h-8 w-8 min-w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none text-[#2B2623]/55 transition hover:bg-[#2B2623]/5 hover:text-coral lg:flex">×</button>
        </div>

      </div>
    </aside>
  );
}

function Field({ error, className, wrapperClassName = "", countryCode = false, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string; wrapperClassName?: string; countryCode?: boolean }) {
  return (
    <label className={`relative min-w-0 ${wrapperClassName}`}>
      <span className="sr-only">{props.placeholder}</span>
      {countryCode && <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[10px] font-bold text-[#2B2623]/55">+91</span>}
      <input {...props} required={props.required ?? true} aria-invalid={Boolean(error)} className={`${className} ${countryCode ? "!pl-12" : ""} ${error ? "border-red-500" : ""}`} />
      {error && <span className="mt-1 block pl-3 text-[9px] leading-none text-red-600 lg:absolute lg:left-3 lg:top-full lg:whitespace-nowrap lg:pl-0">{error}</span>}
    </label>
  );
}

"use client";

import { useLeadSubmission } from "@/components/useLeadSubmission";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { getLeadTracking, redirectToThankYou } from "@/lib/leadTracking";
import SelectChevron from "@/components/SelectChevron";

type EnquiryContextValue = {
  /** Opens the enquiry popup; `ctaLabel` becomes the popup's submit button text. */
  openEnquiry: (ctaLabel?: string) => void;
};

const DEFAULT_SUBMIT_LABEL = "Submit Enquiry";

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

const fieldClassName =
  "h-12 w-full rounded-xl border border-[#eaded7] bg-[#fffaf7] px-4 text-sm text-[#302c2a] outline-none transition placeholder:text-[#9b918c] focus:border-coral focus:bg-white focus:ring-4 focus:ring-coral/10 sm:h-14 sm:text-[15px]";

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const submitLead = useLeadSubmission();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [submitLabel, setSubmitLabel] = useState(DEFAULT_SUBMIT_LABEL);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 250);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const openEnquiry = (ctaLabel?: string) => {
    setSubmitLabel(ctaLabel || DEFAULT_SUBMIT_LABEL);
    setIsSubmitted(false);
    setSubmitError("");
    setConfiguration("");
    setIsOpen(true);
  };

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await submitLead({
          fullName: String(formData.get("fullName") ?? "").trim(),
          phoneNumber: `+91${String(formData.get("phoneNumber") ?? "").replace(/\D/g, "").slice(-10)}`,
          budget: String(formData.get("budget") ?? ""),
          configuration: String(formData.get("interest") ?? ""),
          locationPincode: String(formData.get("locationPincode") ?? "").trim(),
          form: "enquiry-panel",
          ...getLeadTracking(),
        });

      if (!response.ok) throw new Error("Enquiry submission failed");
      setIsSubmitted(true);
      redirectToThankYou();
    } catch {
      setSubmitError("We could not submit your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            aria-label="Close enquiry form"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full animate-[enquiry-backdrop-in_220ms_ease-out] bg-[#17100c]/55 backdrop-blur-[3px]"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[30px] bg-white shadow-[0_-24px_70px_rgba(33,18,10,0.22)] animate-[enquiry-sheet-in_340ms_cubic-bezier(0.22,1,0.36,1)] lg:inset-y-0 lg:left-auto lg:w-full lg:max-w-[480px] lg:max-h-none lg:rounded-l-[34px] lg:rounded-tr-none lg:shadow-[-24px_0_70px_rgba(33,18,10,0.2)] lg:animate-[enquiry-drawer-in_340ms_cubic-bezier(0.22,1,0.36,1)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#ef7952] to-[#d65d45] px-6 pb-7 pt-8 text-white sm:px-8 sm:pb-8 sm:pt-10 lg:px-10">
              <svg
                aria-hidden="true"
                viewBox="0 0 220 160"
                className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-64 opacity-20"
                fill="none"
              >
                <circle cx="190" cy="150" r="112" stroke="white" strokeWidth="10" />
                <circle cx="190" cy="150" r="82" stroke="white" strokeWidth="2" />
                <circle cx="190" cy="150" r="55" stroke="white" strokeWidth="6" />
              </svg>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close enquiry form"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-2xl leading-none text-white transition hover:bg-white hover:text-coral sm:right-6 sm:top-6"
              >
                &times;
              </button>

              <p className="relative text-[11px] font-semibold tracking-[0.26em] text-white/75 sm:text-xs">
                SUMEET URBAN NEST
              </p>
              <h2
                id="enquiry-title"
                className="relative mt-3 pr-12 text-[27px] font-semibold leading-tight tracking-[-0.025em] sm:text-[32px]"
              >
                Let&apos;s find your
                <span className="block">space to open out.</span>
              </h2>
              <p className="relative mt-3 max-w-sm text-sm leading-6 text-white/85 sm:text-[15px]">
                Share your details and our team will contact you with plans,
                pricing and availability.
              </p>
            </div>

            <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
              {isSubmitted ? (
                <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-coral/10 text-coral">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-8 w-8"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-[#302c2a]">
                    Thank you.
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#746b66]">
                    Your enquiry is ready. Our team will get in touch with you
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-7 rounded-xl bg-coral px-7 py-3 text-sm font-semibold text-white transition hover:bg-coral-dark"
                  >
                    Continue exploring
                  </button>
                </div>
              ) : (
                <form onSubmit={submitEnquiry} className="flex flex-col gap-3.5 sm:gap-4">
                  {submitError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{submitError}</p>}
                  <div>
                    <label htmlFor="sticky-full-name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      ref={nameInputRef}
                      required
                      type="text"
                      id="sticky-full-name"
                      name="fullName"
                      autoComplete="name"
                      placeholder="Full Name"
                      className={fieldClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="sticky-phone" className="sr-only">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#302c2a]/55">+91</span>
                      <input
                        required
                        type="tel"
                        id="sticky-phone"
                        name="phoneNumber"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        placeholder="98765 43210"
                        className={`${fieldClassName} pl-13`}
                      />
                    </div>
                  </div>

                  <div className="order-3">
                    <label htmlFor="sticky-budget" className="sr-only">
                      Your Budget
                    </label>
                    <div className="relative">
                      <select
                        required={Boolean(configuration)}
                        disabled={!configuration}
                        id="sticky-budget"
                        name="budget"
                        key={configuration}
                        defaultValue=""
                        className={`${fieldClassName} appearance-none pr-10 text-[#746b66] disabled:cursor-not-allowed disabled:opacity-55`}
                      >
                        <option value="" disabled>Your Budget</option>
                        {configuration === "2-bohk" && <><option value="2-bohk-55-60">₹55L–₹60L</option><option value="2-bohk-60-65-plus">₹60L–₹65L+</option></>}
                        {configuration === "3-bohk" && <><option value="3-bohk-85-90">₹85L–₹90L</option><option value="3-bohk-90-95">₹90L–₹95L</option><option value="3-bohk-95-1cr-plus">₹95L–₹1Cr+</option></>}
                        {configuration === "not-sure" && <><option value="2-bohk-55-60">2 BHK: ₹55L–₹60L</option><option value="2-bohk-60-65-plus">2 BHK: ₹60L–₹65L+</option><option value="3-bohk-85-90">3 BHK: ₹85L–₹90L</option><option value="3-bohk-90-95">3 BHK: ₹90L–₹95L</option><option value="3-bohk-95-1cr-plus">3 BHK: ₹95L–₹1Cr+</option></>}
                      </select>
                      <SelectChevron className="right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="order-2">
                    <label htmlFor="sticky-interest" className="sr-only">
                      Select Configuration
                    </label>
                    <div className="relative">
                      <select
                        required
                        id="sticky-interest"
                        name="interest"
                        value={configuration}
                        onChange={(event) => setConfiguration(event.target.value)}
                        className={`${fieldClassName} appearance-none pr-10 text-[#746b66]`}
                      >
                        <option value="" disabled>
                          Select Configuration
                        </option>
                        <option value="2-bohk">2 BHK</option>
                        <option value="3-bohk">3 BHK</option>
                        <option value="not-sure">Not Sure</option>
                      </select>
                      <SelectChevron className="right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="order-4">
                    <label htmlFor="sticky-location" className="sr-only">
                      Location / Pincode
                    </label>
                    <input
                      type="text"
                      id="sticky-location"
                      name="locationPincode"
                      autoComplete="postal-code"
                      placeholder="Location / Pincode (optional)"
                      className={fieldClassName}
                    />
                  </div>

                  <label className="order-5 flex items-start gap-2 text-xs leading-5 text-[#514c46]">
                    <input required type="checkbox" name="contactConsent" className="mt-1 accent-[#E8734A]" />
                    <span>I agree to be contacted about this project and have read the <a href="/privacy-policy" className="font-semibold text-coral underline">Privacy Policy</a>.</span>
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group order-5 flex h-11 w-full items-center justify-center rounded-full bg-coral px-5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_26px_rgba(232,115,74,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-coral-dark hover:shadow-[0_14px_30px_rgba(232,115,74,0.38)] focus:outline-none focus:ring-4 focus:ring-coral/20"
                  >
                    {isSubmitting ? "Submitting..." : submitLabel}
                  </button>
                </form>
              )}

            </div>
          </section>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}

export function EnquiryButton({
  children,
  className,
  ariaLabel,
  ctaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ctaLabel?: string;
}) {
  const context = useContext(EnquiryContext);

  if (!context) {
    throw new Error("EnquiryButton must be rendered inside EnquiryProvider.");
  }

  return (
    <button
      type="button"
      onClick={() => context.openEnquiry(ctaLabel)}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);

  if (!context) {
    throw new Error("useEnquiry must be rendered inside EnquiryProvider.");
  }

  return context;
}

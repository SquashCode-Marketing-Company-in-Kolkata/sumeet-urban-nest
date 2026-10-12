"use client";

import { useLeadSubmission } from "@/components/useLeadSubmission";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import { getLeadTracking, redirectToThankYou } from "@/lib/leadTracking";
import SelectChevron from "@/components/SelectChevron";

type Errors = Partial<Record<"fullName" | "phoneNumber" | "budget" | "interest" | "locationPincode" | "form", string>>;

export default function ContactSection() {
  const submitLead = useLeadSubmission();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [configuration, setConfiguration] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const phoneNumber = String(data.get("phoneNumber") ?? "").replace(/\D/g, "");
    const budget = String(data.get("budget") ?? "");
    const interest = String(data.get("interest") ?? "");
    const locationPincode = String(data.get("locationPincode") ?? "").trim();
    const nextErrors: Errors = {};

    if (fullName.length < 2) nextErrors.fullName = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(phoneNumber.slice(-10))) nextErrors.phoneNumber = "Enter a valid 10-digit mobile number";
    if (!budget) nextErrors.budget = "Please select your budget";
    if (!interest) nextErrors.interest = "Please select a configuration";
    if (locationPincode && !/^\d{6}$/.test(locationPincode)) nextErrors.locationPincode = "Enter a valid 6-digit pincode";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await submitLead({
            fullName,
            phoneNumber: `+91${phoneNumber.slice(-10)}`,
            budget,
            configuration: interest,
            locationPincode,
            form: "contact-section",
            ...getLeadTracking(),
          });

        if (!response.ok) throw new Error("Enquiry submission failed");
        redirectToThankYou();
      } catch {
        setErrors({ form: "We could not submit your enquiry. Please try again." });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[#F7F5F0] pt-16 pb-10 sm:pt-20 sm:pb-12 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16"
    >
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Section Header */}
        <div className="mx-auto mb-10 flex w-full max-w-[1100px] flex-col items-center justify-center text-center sm:mb-14">
          <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
            <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Private Enclave · 09
            </span>
            <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
          </div>

          <h2 className="w-full text-center whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            CONTACT US
          </h2>
        </div>

        {/* Full-Width Split Card: Left Architectural Image & Right Form */}
        <div className="grid w-full overflow-hidden rounded-[28px] border border-[#2B2623]/8 bg-white shadow-[0_24px_70px_rgba(43,38,35,0.08)] sm:rounded-[36px] lg:grid-cols-12">
          {/* Left Column: Full-Bleed Architectural Image */}
          <div className="relative min-h-[360px] w-full overflow-hidden bg-[#2B2623] sm:min-h-[440px] lg:col-span-6 lg:min-h-full">
            <Image
              src="/images/exterior/elevation-view-1.webp"
              alt="Sumeet Urban Nest luxury architectural elevation"
              fill
              sizes="(min-width: 1024px) 50vw, (max-width: 1080px) 100vw, 1080px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {/* Architectural overlay caption */}
            <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-9 lg:p-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                  Khamardih, Shankar Nagar&apos;s first BOHK homes
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-light leading-snug text-white sm:text-3xl lg:text-4xl">
                  Step into a home that opens out.
                </h3>
                <p className="mt-2 text-xs font-light tracking-wide text-white/80 sm:text-sm">
                  Khamardih, Shankar Nagar • Raipur, Chhattisgarh
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  <span>RERA: PCGRERA190326002064</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Lead Generation Form */}
          <div className="flex flex-col justify-center bg-white p-7 sm:p-10 lg:col-span-6 lg:p-12 xl:p-16">
            <div className="mb-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-coral">
                Private Preview
              </span>
              <h3 className="mt-1 text-2xl font-light tracking-tight text-[#2B2623] sm:text-3xl">
                Request Exclusive Access
              </h3>
              <p className="section-description mt-2 text-[#747474]">
                Register below to schedule your private site walkthrough and receive the complete architectural brochure &amp; floor plans.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4.5">
              {errors.form && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{errors.form}</p>}
              {/* Full Name */}
              <div className="order-0 sm:col-span-2">
                <label htmlFor="contactFullName" className="sr-only">
                  Full Name <span className="text-coral">*</span>
                </label>
                <input
                  type="text"
                  id="contactFullName"
                  name="fullName"
                  placeholder="Full Name"
                  className={`h-12 w-full rounded-xl border bg-[#F8F7F4] px-4 text-sm text-[#2B2623] outline-none transition placeholder:text-[#2B2623]/40 focus:bg-white focus:ring-2 focus:ring-coral/20 ${
                    errors.fullName ? "border-red-400 focus:border-red-500" : "border-[#2B2623]/15 focus:border-coral"
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.fullName}</p>}
              </div>

              {/* Phone & Budget Row */}
              <div className="contents">
                <div className="order-1">
                  <label htmlFor="contactPhoneNumber" className="sr-only">
                    Mobile Number <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#2B2623]/50">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="contactPhoneNumber"
                      name="phoneNumber"
                      maxLength={10}
                      placeholder="Mobile Number"
                      className={`h-12 w-full rounded-xl border bg-[#F8F7F4] pl-13 pr-4 text-sm text-[#2B2623] outline-none transition placeholder:text-[#2B2623]/40 focus:bg-white focus:ring-2 focus:ring-coral/20 ${
                        errors.phoneNumber ? "border-red-400 focus:border-red-500" : "border-[#2B2623]/15 focus:border-coral"
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.phoneNumber}</p>}
                </div>

                <div className="order-3">
                  <label htmlFor="contactBudget" className="sr-only">
                    Your Budget <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                  <select
                      id="contactBudget"
                      name="budget"
                      key={configuration}
                      defaultValue=""
                      disabled={!configuration}
                    className={`h-12 w-full appearance-none rounded-xl border bg-[#F8F7F4] px-4 pr-12 text-sm text-[#2B2623] outline-none transition focus:bg-white focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-55 ${
                      errors.budget ? "border-red-400 focus:border-red-500" : "border-[#2B2623]/15 focus:border-coral"
                    }`}
                  >
                    <option value="" disabled>Your Budget *</option>
                    {configuration === "2-bohk" && <><option value="2-bohk-55-60">₹55L–₹60L</option><option value="2-bohk-60-65-plus">₹60L–₹65L+</option></>}
                    {configuration === "3-bohk" && <><option value="3-bohk-85-90">₹85L–₹90L</option><option value="3-bohk-90-95">₹90L–₹95L</option><option value="3-bohk-95-1cr-plus">₹95L–₹1Cr+</option></>}
                    {configuration === "not-sure" && <><option value="2-bohk-55-60">2 BHK: ₹55L–₹60L</option><option value="2-bohk-60-65-plus">2 BHK: ₹60L–₹65L+</option><option value="3-bohk-85-90">3 BHK: ₹85L–₹90L</option><option value="3-bohk-90-95">3 BHK: ₹90L–₹95L</option><option value="3-bohk-95-1cr-plus">3 BHK: ₹95L–₹1Cr+</option></>}
                  </select>
                  <SelectChevron />
                  </div>
                  {errors.budget && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.budget}</p>}
                </div>
              </div>

              {/* Configuration & Pincode Row */}
              <div className="contents">
                <div className="order-2">
                  <label htmlFor="contactInterest" className="sr-only">
                    Select Configuration <span className="text-coral">*</span>
                  </label>
                  <div className="relative">
                  <select
                    id="contactInterest"
                    name="interest"
                    value={configuration}
                    onChange={(event) => setConfiguration(event.target.value)}
                    className={`h-12 w-full appearance-none rounded-xl border bg-[#F8F7F4] px-4 pr-12 text-sm text-[#2B2623] outline-none transition focus:bg-white focus:ring-2 focus:ring-coral/20 ${
                      errors.interest ? "border-red-400 focus:border-red-500" : "border-[#2B2623]/15 focus:border-coral"
                    }`}
                  >
                    <option value="" disabled>Select Configuration</option>
                    <option value="2-bohk">2 BHK</option>
                    <option value="3-bohk">3 BHK</option>
                    <option value="not-sure">Not Sure</option>
                  </select>
                  <SelectChevron />
                  </div>
                  {errors.interest && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.interest}</p>}
                </div>

                <div className="order-4">
                  <label htmlFor="contactPincode" className="sr-only">
                    Current Pincode (optional)
                  </label>
                  <input
                    type="text"
                    id="contactPincode"
                    name="locationPincode"
                    maxLength={6}
                    placeholder="Current Pincode (optional)"
                    className={`h-12 w-full rounded-xl border bg-[#F8F7F4] px-4 text-sm text-[#2B2623] outline-none transition placeholder:text-[#2B2623]/40 focus:bg-white focus:ring-2 focus:ring-coral/20 ${
                      errors.locationPincode ? "border-red-400 focus:border-red-500" : "border-[#2B2623]/15 focus:border-coral"
                    }`}
                  />
                  {errors.locationPincode && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.locationPincode}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="order-5 pt-2 sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-full bg-coral px-5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_26px_rgba(232,115,74,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-coral-dark hover:shadow-[0_14px_30px_rgba(232,115,74,0.38)] focus:outline-none focus:ring-4 focus:ring-coral/20 disabled:opacity-70"
                >
                  <span>{isSubmitting ? "Processing..." : "Enquire Now"}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <label className="order-6 flex items-start gap-2 text-xs leading-5 text-[#514c46] sm:col-span-2">
                <input required type="checkbox" name="contactConsent" className="mt-1 accent-[#E8734A]" />
                <span>I agree to be contacted about Sumeet Urban Nest and have read the <a href="/privacy-policy" className="font-semibold text-coral underline">Privacy Policy</a>.</span>
              </label>
              <div className="order-6 flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] text-[#747474] sm:col-span-2 sm:gap-6">
                <span className="flex items-center gap-1.5">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coral/15 text-[9px] font-bold text-coral">✓</span>
                  Direct Developer Access
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coral/15 text-[9px] font-bold text-coral">✓</span>
                  Zero Brokerage
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coral/15 text-[9px] font-bold text-coral">✓</span>
                  See our Privacy Policy
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import LeadConversion from "@/components/LeadConversion";

export const metadata = {
  title: "Thank You | Sumeet Urban Nest",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#2B2623] px-6 py-12 text-white sm:px-10 sm:py-16">
      <LeadConversion />
      <Image src="/images/exterior/hero-building.webp" alt="Sumeet Urban Nest architectural elevation" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/75 to-black/85" />
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <Link href="/" aria-label="Sumeet Urban Nest home" className="mb-10 sm:mb-12">
          <Image src="/sumeet-urban-nest-logo-white.webp" alt="Sumeet Urban Nest" width={1921} height={819} sizes="(min-width: 640px) 190px, 150px" className="h-auto w-[150px] sm:w-[190px]" priority />
        </Link>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-8 w-8"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg>
        </div>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/75 sm:text-xs">Enquiry received</p>
        <h1 className="mt-3 text-5xl font-light tracking-[-0.04em] sm:text-7xl">Thank you.</h1>
        <p className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">Your details have been received. Our team will connect with you shortly to help you discover your new home.</p>
        <a href="/downloads/sumeet-urban-nest-brochure.pdf" download="Sumeet Urban Nest Brochure.pdf" className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-coral px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_rgba(232,115,74,0.28)] transition hover:-translate-y-0.5 hover:bg-coral-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-14 sm:text-xs">
          Download Brochure
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 transition-transform group-hover:translate-y-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg>
        </a>
        <Link href="/" className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 transition hover:text-white">Back to website</Link>
      </div>
    </main>
  );
}

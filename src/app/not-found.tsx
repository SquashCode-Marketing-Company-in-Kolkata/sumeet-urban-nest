import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5F0] px-6 py-16 text-center">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-coral/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#D6AC70]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        <Image
          src="/logo.webp"
          alt="Sumeet Urban Nest"
          width={1921}
          height={819}
          className="h-auto w-40"
          priority
          sizes="160px"
        />
        <p className="mt-12 text-sm font-semibold uppercase tracking-[0.3em] text-coral">Error 404</p>
        <h1 className="mt-4 text-5xl font-light tracking-[-0.04em] text-[#2B2623] sm:text-6xl">Page not found</h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-[#6D625C]">
          The page you are looking for may have moved or is no longer available.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-coral px-6 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_26px_rgba(232,115,74,0.32)] transition hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          Return Home
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h13m-5-5 5 5-5 5" />
          </svg>
        </Link>
      </div>
    </main>
  );
}

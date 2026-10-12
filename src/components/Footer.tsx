import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e4dc] bg-[#F8F7F3] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        <div className="grid grid-cols-2 items-center gap-x-6 gap-y-8 md:grid-cols-[1fr_1fr_auto] md:gap-14">
          <div className="order-1">
            <Link
              href="/"
              aria-label="Sumeet Urban Nest home"
              className="inline-flex"
            >
              <Image
                src="/logo.webp"
                alt="Sumeet Urban Nest"
                width={1921}
                height={819}
                className="h-auto w-[135px] max-w-full object-contain md:w-[230px]"
                sizes="(min-width: 768px) 230px, 135px"
              />
            </Link>

            <p className="mt-5 hidden max-w-md text-sm font-light leading-7 text-[#5e5e5e] md:block md:text-base">
              Khamardih, Shankar Nagar&apos;s first BOHK homes.
              <span className="block">Designed to open out your everyday.</span>
            </p>
          </div>

          <div className="order-3 col-span-2 text-center md:order-2 md:col-span-1 md:text-left">
            <h2 className="mb-4 text-sm font-medium tracking-[0.48em] text-[#555555] md:text-base">
              CORPORATE
            </h2>
            <address className="text-sm font-light not-italic leading-7 text-[#5e5e5e] md:text-base">
              Sumeet Business Park,
              <span className="block">Pachpedi Naka, Raipur, Chhattisgarh</span>
            </address>
          </div>

          <div className="order-2 flex justify-end md:order-3">
            <Image
              src="/images/interior/sumeet-infracon-logo.webp"
              alt="Sumeet Infracon"
              width={1268}
              height={1241}
              className="h-auto w-[90px] max-w-full object-contain md:w-[165px]"
              sizes="(min-width: 768px) 165px, 90px"
            />
          </div>
        </div>

        <div className="mt-10 border-t border-[#e2ded6] pt-6 text-center md:mt-12">
          <p className="text-xs font-medium tracking-wide text-[#777169] md:text-sm">
            RERA No.: PCGRERA190326002064
            <span className="mx-2 text-[#c7c0b7]" aria-hidden="true">|</span>
            <a
              href="https://rera.cgstate.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-coral"
            >
              rera.cgstate.gov.in
            </a>
          </p>
          <p className="mt-3 text-xs text-[#625a52] md:text-sm">
            &copy; 2026 Sumeet Infracon Pvt. Ltd. All renderings are indicative and subject to change.
          </p>
          <p className="mt-3 text-xs"><Link href="/privacy-policy" className="text-[#777169] underline transition-colors hover:text-coral">Privacy Policy</Link></p>
          <p className="mt-3 text-[10px] leading-relaxed text-[#625a52]">
            <a href="https://squashcode.com/" className="transition-colors hover:text-coral">
              Developed and maintained by SquashCode
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

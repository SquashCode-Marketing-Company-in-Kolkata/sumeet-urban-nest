import Image from "next/image";

export default function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-24 md:py-28 lg:py-20"
    >
      <Image
        src="/images/exterior/amenities-rings.webp"
        alt=""
        width={2034}
        height={773}
        sizes="(min-width: 1280px) 700px, (min-width: 1024px) 620px, (min-width: 768px) 500px, (min-width: 640px) 400px, 300px"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 z-0 h-auto w-[260px] max-w-none translate-y-0 select-none opacity-20 sm:w-[340px] md:w-[420px] lg:right-0 lg:w-[560px] lg:translate-y-[24%] lg:opacity-25 xl:w-[700px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1720px] items-center gap-8 px-6 sm:gap-10 sm:px-10 md:px-14 lg:px-20 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:gap-16 xl:px-28 2xl:gap-20 2xl:px-36">
        <Image
          src="/images/circular-garden-living-diorama.webp"
          alt="Circular garden living at Sumeet Urban Nest"
          width={1832}
          height={858}
          sizes="(min-width: 1024px) 50vw, (max-width: 1080px) 100vw, 1080px"
          className="h-auto w-full max-w-[850px] justify-self-center mix-blend-multiply xl:-ml-[13.5%] xl:w-[115%] xl:max-w-none xl:justify-self-start [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_74%)]"
        />

        <div className="min-w-0 text-center xl:-translate-x-12 xl:text-left">
          {/* Top Editorial Eyebrow */}
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-3 lg:justify-start">
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12 xl:hidden" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Project Overview · 01
            </span>
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12 xl:hidden" />
          </div>

          {/* Main Heading in Orange */}
          <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            OVERVIEW
          </h2>

          <p className="section-description mx-auto mt-6 max-w-[560px] font-light text-[#2c2b29] sm:mt-8 xl:mx-0">
            Introducing BOHK homes, a new concept of modern living at Khamardih, Shankar Nagar, thoughtfully designed to bring together light, space, comfort and a more connected everyday lifestyle.
          </p>
          <div className="mt-10 grid grid-cols-3 border-y border-[#2c2b29]/15 sm:mt-12">
            {[
              ["152", "Residences"],
              ["1.76", "Acres"],
              ["3", "Towers"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`min-w-0 px-2 py-7 sm:px-6 sm:py-9 xl:py-7 ${
                  index > 0 ? "border-l border-[#2c2b29]/15" : ""
                } ${index === 0 ? "xl:pl-0" : ""}`}
              >
                <p className="text-3xl font-light tracking-[-0.04em] text-[#2c2b29] sm:text-5xl md:text-6xl lg:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-coral sm:mt-3 sm:text-xs sm:tracking-[0.24em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

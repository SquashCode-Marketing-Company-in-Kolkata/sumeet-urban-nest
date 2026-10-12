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
        className="pointer-events-none absolute left-0 bottom-0 z-0 h-auto w-[300px] max-w-none -scale-x-100 translate-y-0 select-none opacity-25 sm:left-0 sm:w-[400px] md:left-0 md:w-[500px] lg:-left-12 lg:w-[620px] lg:translate-y-[32%] lg:opacity-30 xl:w-[700px]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 px-6 sm:px-10 md:px-14 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-20 xl:gap-20">
        <Image
          src="/images/circular-garden-living-diorama.webp"
          alt="Circular garden living at Sumeet Urban Nest"
          width={1832}
          height={858}
          sizes="(min-width: 1024px) 50vw, (max-width: 1080px) 100vw, 1080px"
          className="h-auto w-full mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_74%)] lg:scale-110"
        />

        <div className="text-center lg:text-left">
          {/* Top Editorial Eyebrow */}
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-3 lg:justify-start">
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12 lg:hidden" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Project Overview · 01
            </span>
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
          </div>

          {/* Main Heading in Orange */}
          <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            OVERVIEW
          </h2>

          <p className="section-description mx-auto mt-6 max-w-[780px] font-light text-[#2c2b29] sm:mt-8 lg:mx-0">
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
                className={`px-2 py-7 sm:px-6 sm:py-9 lg:py-7 ${
                  index > 0 ? "border-l border-[#2c2b29]/15" : ""
                } ${index === 0 ? "lg:pl-0" : ""}`}
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

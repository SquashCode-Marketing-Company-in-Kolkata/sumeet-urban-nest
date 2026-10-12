import SectionCta from "@/components/SectionCta";

const blocks = [
  {
    name: "BLOCK A",
    units: "6 Units / Floor",
    floors: "Typical 1st to 9th Floor",
  },
  {
    name: "BLOCK B",
    units: "6 Units / Floor",
    floors: "Typical 1st to 9th Floor",
  },
  {
    name: "BLOCK C",
    units: "4 Units / Floor",
    floors: "Typical 3rd to 9th Floor",
  },
];

export default function LayoutSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4f1] py-20 text-[#2c2b29] sm:py-24 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-coral/10 blur-[110px]" />
      <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        <div className="mx-auto mb-10 max-w-[850px] text-center sm:mb-12 md:mb-16">
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:mb-4 sm:gap-3">
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Thoughtful Planning · 08
            </span>
            <span className="h-px w-6 bg-[#2c2b29]/25 sm:w-12" />
          </div>
          <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            TOWERS
          </h2>
          <p className="section-description mx-auto mt-5 max-w-[620px] text-[#6d625c]">
            Three distinct towers, thoughtfully composed to bring light, privacy and openness into everyday living.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1420px] gap-4 md:grid-cols-3 md:gap-6">
          {blocks.map((block) => (
            <article
              key={block.name}
              className="group relative overflow-hidden rounded-[24px] border border-[#e8ded7] bg-white p-6 shadow-[0_12px_35px_rgba(83,55,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(83,55,39,0.14)] sm:p-8"
            >
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full border-[18px] border-coral/5 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative flex items-start justify-between gap-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-coral">
                  {block.name}
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff2ea] text-xs font-semibold text-coral">
                  {block.name.slice(-1)}
                </span>
              </div>
              <div className="relative mt-11 border-b border-[#eee5df] pb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a817b]">Residences per floor</p>
                <h3 className="mt-3 text-3xl font-light leading-tight tracking-[-0.035em] text-[#292929] sm:text-[34px]">
                {block.units}
                </h3>
              </div>
              <div className="relative mt-5 flex items-center gap-3 text-sm text-[#746b66]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f8f1e8] text-coral">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 20V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v15M3 20h18M9 8h1m4 0h1M9 12h1m4 0h1" /></svg>
                </span>
                <p>{block.floors}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center sm:mt-10">
          <SectionCta label="Schedule a Site Visit" />
        </div>
      </div>
    </section>
  );
}

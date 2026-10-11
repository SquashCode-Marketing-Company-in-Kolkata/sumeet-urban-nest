const googleMapUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1936.1935760810461!2d81.6740626!3d21.2556491!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd7d5b577cbb%3A0xc053073222c4a135!2sSumeet%20Urban%20Nest!5e0!3m2!1sen!2sin!4v1791615200475!5m2!1sen!2sin";

const distances = [
  { place: "Expressway", distance: "1.8 km" },
  { place: "SMC Hospital", distance: "2.1 km" },
  { place: "Civil Lines", distance: "3.7 km" },
  { place: "Ambuja Mall", distance: "3.8 km" },
  { place: "Pandri", distance: "3.9 km" },
  { place: "Raipur Railway Station", distance: "6.8 km" },
  { place: "Swami Vivekananda Airport", distance: "13.7 km" },
];

export default function LocationSection() {
  return (
    <section id="location" className="scroll-mt-20 bg-[#fff8f0] py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        <div className="grid w-full overflow-hidden rounded-[28px] bg-white shadow-[0_24px_70px_rgba(71,49,38,0.1)] lg:grid-cols-2 lg:rounded-[36px]">
          <div className="relative order-2 min-h-[380px] w-full overflow-hidden bg-[#e9e8e4] sm:min-h-[500px] lg:order-none lg:min-h-[720px]">
          <iframe
            src={googleMapUrl}
            title="Sumeet Urban Nest location on Google Maps"
            className="absolute inset-0 h-full w-full border-0"
            style={{ colorScheme: "light" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-8 lg:py-12 xl:px-12">
          <div className="flex flex-col gap-4 sm:gap-5">
          {/* Top Editorial Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#2c2b29]/25 sm:w-12" />
            <span className="section-eyebrow font-semibold uppercase text-[#2c2b29]">
              Strategic Connectivity · 07
            </span>
          </div>

          <h2 className="whitespace-nowrap text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] sm:tracking-[0.28em] text-coral uppercase">
            L O C A T I O N
          </h2>

          <p className="section-description max-w-2xl text-[#747474]">
            Sumeet Urban Nest is set in a location that keeps the city close
            without letting it close in on you. From healthcare and shopping
            to business hubs and daily commute points, everything stays
            comfortably accessible here.
          </p>
          </div>

          <div className="mt-8 border-t border-[#eadfd8] pt-6">
            <h3 className="mb-4 text-lg font-semibold text-[#2d2d2d] md:text-xl">
              Distance
            </h3>

            <div className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1 xl:grid-cols-2">
              {distances.map((item) => (
                <div
                  key={item.place}
                  className="flex items-center justify-between gap-5 border-b border-[#eee6e0] py-3.5 text-sm text-[#4f4f4f] md:text-[15px]"
                >
                  <span>{item.place}</span>
                  <span className="shrink-0 rounded-full bg-[#fff1e7] px-3 py-1 font-semibold text-coral">{item.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

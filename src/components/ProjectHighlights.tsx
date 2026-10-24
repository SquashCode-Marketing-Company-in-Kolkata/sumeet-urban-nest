const highlights = [
  ["152", "Residences"],
  ["1.76", "Acres"],
  ["3", "Towers"],
];

/** Key project facts shown alongside the enquiry and contact forms. */
export default function ProjectHighlights({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "onCoral";
  className?: string;
}) {
  const onCoral = tone === "onCoral";

  return (
    <div
      className={`relative flex items-stretch gap-4 rounded-2xl border border-dashed px-5 pb-5 pt-5 ${
        onCoral ? "border-white/45 bg-white/10" : "border-coral/45 bg-[#fffaf7]"
      } ${className}`}
    >
      <span
        className={`absolute -top-3 left-4 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] shadow-[0_6px_16px_rgba(232,115,74,0.3)] ${
          onCoral ? "bg-white text-coral" : "bg-coral text-white"
        }`}
      >
        2 &amp; 3 BHK BOHK Homes
      </span>
      {highlights.map(([value, label], index) => (
        <div key={label} className="flex flex-1 items-stretch gap-4">
          {index > 0 && <span aria-hidden="true" className={`w-px ${onCoral ? "bg-white/35" : "bg-coral/25"}`} />}
          <div className="flex-1">
            <p className={`text-3xl font-semibold leading-none tracking-[-0.04em] sm:text-4xl ${onCoral ? "text-white" : index === 0 ? "text-coral" : "text-[#2B2623]"}`}>{value}</p>
            <p className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${onCoral ? "text-white/85" : "text-[#514c46]"}`}>{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

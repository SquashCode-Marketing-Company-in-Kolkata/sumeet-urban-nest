/** 30:70 payment plan summary shown alongside the enquiry and contact forms. */
export default function PaymentOffer({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "onCoral";
  className?: string;
}) {
  const onCoral = tone === "onCoral";

  return (
    <div
      className={`relative flex items-stretch gap-4 rounded-2xl border border-dashed px-5 pb-6 pt-4 ${
        onCoral ? "border-white/45 bg-white/10" : "border-coral/45 bg-[#fffaf7]"
      } ${className}`}
    >
      <div className="flex-1">
        <p className={`text-3xl font-semibold leading-none tracking-[-0.04em] sm:text-4xl ${onCoral ? "text-white" : "text-coral"}`}>30%</p>
        <p className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${onCoral ? "text-white/85" : "text-[#514c46]"}`}>Pay now</p>
      </div>
      <span aria-hidden="true" className={`w-px ${onCoral ? "bg-white/35" : "bg-coral/25"}`} />
      <div className="flex-1">
        <p className={`text-3xl font-semibold leading-none tracking-[-0.04em] sm:text-4xl ${onCoral ? "text-white" : "text-[#2B2623]"}`}>70%</p>
        <p className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${onCoral ? "text-white/85" : "text-[#514c46]"}`}>On possession</p>
      </div>
      <span className={`absolute bottom-1.5 right-3 text-[9px] ${onCoral ? "text-white/60" : "text-[#9b918c]"}`}>*T&amp;C apply</span>
    </div>
  );
}

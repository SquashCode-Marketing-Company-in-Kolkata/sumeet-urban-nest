import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sumeet Infracon Pvt. Ltd. uses information submitted through the Sumeet Urban Nest website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] px-6 py-12 text-[#2B2623] sm:py-20">
      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-semibold text-coral underline">← Sumeet Urban Nest</Link>
        <h1 className="mt-8 text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-[#6b625c]">Effective 12 October 2026</p>
        <div className="mt-8 space-y-8 text-sm leading-7 sm:text-base">
          <section><h2 className="text-xl font-semibold">Who we are</h2><p className="mt-2">Sumeet Infracon Pvt. Ltd. operates the Sumeet Urban Nest website and handles enquiries about the project. Our corporate address is Sumeet Business Park, Pachpedi Naka, Raipur, Chhattisgarh, India.</p></section>
          <section><h2 className="text-xl font-semibold">Information we collect</h2><p className="mt-2">When you submit an enquiry, we collect your name, phone number, preferred home configuration, budget and any optional location or pincode you provide. We also collect the page and referral information associated with the enquiry, including campaign parameters when present. Analytics and advertising tools on this site may collect device and visit information through cookies or similar technologies.</p></section>
          <section><h2 className="text-xl font-semibold">How we use it</h2><p className="mt-2">We use your details to respond to your request, share project information, arrange a site visit and understand which campaigns bring visitors to the site. We may contact you by phone or message about your Sumeet Urban Nest enquiry.</p></section>
          <section><h2 className="text-xl font-semibold">Service providers</h2><p className="mt-2">Enquiry data is processed using our lead storage and workflow providers, including Supabase, Salesforce and Pabbly. Google Tag Manager may load analytics or advertising services. These providers process information to support the purposes described above.</p></section>
          <section><h2 className="text-xl font-semibold">Retention and choices</h2><p className="mt-2">We keep enquiry information for as long as needed to manage the enquiry and meet applicable obligations. You can ask us to update or delete your enquiry details, or stop project follow-up, by writing to Sumeet Infracon Pvt. Ltd. at the corporate address above. You can manage cookies through your browser settings.</p></section>
          <section><h2 className="text-xl font-semibold">Updates</h2><p className="mt-2">We may update this policy as our website and services change. The effective date at the top shows when this version took effect.</p></section>
        </div>
      </article>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

type SectionKind = "gallery" | "plan";
const loaders: Record<SectionKind, () => Promise<{ default: ComponentType }>> = {
  gallery: () => import("./GallerySection"),
  plan: () => import("./PlanSection"),
};

export default function DeferredSection({ kind }: { kind: SectionKind }) {
  const anchor = useRef<HTMLDivElement>(null);
  const [Section, setSection] = useState<ComponentType | null>(null);

  useEffect(() => {
    const element = anchor.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      loaders[kind]().then((module) => setSection(() => module.default));
    }, { rootMargin: "600px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [kind]);

  return <div ref={anchor} id={kind} className="min-h-[360px] scroll-mt-20">{Section ? <Section /> : <section className="flex min-h-[360px] flex-col items-center justify-center bg-[#F8F7F3] px-6 text-center"><h2 className="text-2xl font-light uppercase tracking-[0.2em] text-coral">{kind === "gallery" ? "Gallery" : "Master Plan"}</h2><p className="mt-3 max-w-xl text-sm text-[#514c46]">{kind === "gallery" ? "Explore the architecture, interiors and amenities of Sumeet Urban Nest." : "Explore the landscaped spaces and amenities across the Sumeet Urban Nest master plan."}</p></section>}</div>;
}

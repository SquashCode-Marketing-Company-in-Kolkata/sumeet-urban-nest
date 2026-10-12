"use client";

import { useEffect, useRef, useState } from "react";

export default function DeferredMap({ src }: { src: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={container} className="absolute inset-0 flex items-center justify-center text-sm text-[#5c5a56]">
    {visible ? <iframe src={src} title="Sumeet Urban Nest location on Google Maps" className="h-full w-full border-0" style={{ colorScheme: "light" }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /> : "Map loads when you reach this section"}
  </div>;
}

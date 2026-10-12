"use client";

import { useEffect, useState } from "react";

// A brief brand accent that never hides the hero or waits for page assets.
export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div id="site-preloader" aria-hidden="true" className="pointer-events-none fixed bottom-6 left-1/2 z-[80] w-max max-w-[calc(100vw-3rem)] -translate-x-1/2 rounded-full border border-white/25 bg-[#110E0C]/85 px-4 py-2 text-center text-[10px] font-medium tracking-[0.08em] text-white shadow-lg backdrop-blur-sm sm:bottom-8">
      Khamardih, Shankar Nagar&apos;s first BOHK homes
      <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
    </div>
  );
}

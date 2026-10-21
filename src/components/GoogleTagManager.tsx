"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GTM_ID = "GTM-TZMGJLFG";
const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;
// Fallback for visitors who read without interacting; long enough to keep tags off the first render.
const IDLE_DELAY_MS = 4000;

let loaded = false;

function loadGtm() {
  if (loaded) return;
  loaded = true;
  const browser = window as typeof window & { dataLayer?: unknown[] };
  browser.dataLayer ??= [];
  browser.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/** Loads GTM after the first interaction or once the page has settled, so tags never compete with the first paint. */
export default function GoogleTagManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (loaded) return;
    // Conversion pages load tags straight away so lead events are never missed.
    if (pathname.startsWith("/thank-you")) {
      loadGtm();
      return;
    }

    let timer: number | undefined;
    const start = () => {
      cleanup();
      loadGtm();
    };
    const startTimer = () => {
      timer = window.setTimeout(start, IDLE_DELAY_MS);
    };
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("load", startTimer);
      for (const event of INTERACTION_EVENTS) window.removeEventListener(event, start);
    }

    for (const event of INTERACTION_EVENTS) window.addEventListener(event, start, { once: true, passive: true });
    if (document.readyState === "complete") startTimer();
    else window.addEventListener("load", startTimer, { once: true });
    return cleanup;
  }, [pathname]);

  return null;
}

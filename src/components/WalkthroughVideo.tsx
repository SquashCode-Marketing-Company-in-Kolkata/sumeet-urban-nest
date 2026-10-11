"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const VIDEO_URL = "https://www.youtube-nocookie.com/embed/fT4UaBFgPfc?autoplay=1&mute=0&controls=1&playsinline=1&rel=0";

const WalkthroughVideoContext = createContext<(() => void) | null>(null);

export function useWalkthroughVideo() {
  const openVideo = useContext(WalkthroughVideoContext);
  if (!openVideo) throw new Error("Walkthrough video must be used within its provider");
  return openVideo;
}

export function WalkthroughVideoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const closeVideo = useCallback(() => {
    setIsOpen(false);
    if (document.fullscreenElement === playerRef.current) {
      void document.exitFullscreen().catch(() => {});
    }
    screen.orientation?.unlock?.();
  }, []);

  const openVideo = useCallback(() => {
    // Keep the fullscreen request in the click gesture, including on mobile.
    flushSync(() => setIsOpen(true));
    const player = playerRef.current;
    if (player?.requestFullscreen) {
      void player.requestFullscreen().then(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
          const orientation = screen.orientation as ScreenOrientation & {
            lock?: (mode: "landscape") => Promise<void>;
          };
          void orientation?.lock?.("landscape").catch(() => {});
        }
      }).catch(() => {
        // The fixed, landscape-oriented player remains available on browsers
        // that do not allow element fullscreen or orientation locking.
      });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeVideo();
    };
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) closeVideo();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [isOpen, closeVideo]);

  return (
    <WalkthroughVideoContext.Provider value={openVideo}>
      {children}
      <div
        ref={playerRef}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? true : undefined}
        aria-label={isOpen ? "Sumeet Urban Nest walkthrough video" : undefined}
        aria-hidden={!isOpen}
        className={`walkthrough-player ${isOpen ? "walkthrough-player--open" : ""}`}
      >
        {isOpen && (
          <div className="walkthrough-player__stage">
            <iframe
              className="walkthrough-player__video"
              src={VIDEO_URL}
              title="Sumeet Urban Nest architectural walkthrough"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <button
              type="button"
              onClick={closeVideo}
              aria-label="Close walkthrough video"
              className="walkthrough-player__close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </WalkthroughVideoContext.Provider>
  );
}

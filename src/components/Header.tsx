"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEnquiry } from "@/components/EnquiryPanel";
import { useWalkthroughVideo } from "@/components/WalkthroughVideo";

const navLinks = [
  { name: "Amenities", href: "#amenities", id: "amenities" },
  { name: "Gallery", href: "#gallery", id: "gallery" },
  { name: "Walkthrough", href: "#walkthrough", id: "walkthrough" },
  { name: "Master Plan", href: "#plan", id: "plan" },
  { name: "Specifications", href: "#specifications", id: "specifications" },
  { name: "Location", href: "#location", id: "location" },
  { name: "Contact", href: "#contact", id: "contact" },
  { name: "About Developer", href: "#developer", id: "developer" },
];

export default function Header() {
  const { openEnquiry } = useEnquiry();
  const openWalkthroughVideo = useWalkthroughVideo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      const getDocumentTop = (element: HTMLElement) =>
        element.getBoundingClientRect().top + window.scrollY;

      // If the user is above the first navigable section, no menu item is highlighted.
      const amenitiesEl = document.getElementById("amenities");
      if (!amenitiesEl || scrollY + window.innerHeight * 0.28 < getDocumentTop(amenitiesEl)) {
        setActiveSection("");
        return;
      }

      // 2. Detect which section is currently active based on scroll position
      const scrollPosition = scrollY + Math.min(window.innerHeight * 0.32, 280);
      let current = "";

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && scrollPosition >= getDocumentTop(el)) {
          current = navLinks[i].id;
          break;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("load", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("load", handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    if (id === "walkthrough") {
      setIsMobileMenuOpen(false);
      openWalkthroughVideo();
      return;
    }
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      const headerOffset = 70;
      const targetPosition =
        targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-gray-100 bg-white/95 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md max-md:bg-white"
            : "bg-transparent py-4 sm:py-6 max-md:border-b max-md:border-gray-100 max-md:bg-white max-md:py-3 max-md:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
          {/* Logo aligned to the left content edge */}
          <Link
            href="/"
            aria-label="Sumeet Urban Nest home"
            className="shrink-0 transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.webp"
              alt="Sumeet Urban Nest"
              width={1921}
              height={819}
              sizes="(min-width: 380px) 115px, 105px"
              loading="lazy"
              className="h-auto w-[105px] min-[380px]:w-[115px] md:hidden"
            />
            <Image
              src={isScrolled ? "/logo.webp" : "/sumeet-urban-nest-logo-white.webp"}
              alt="Sumeet Urban Nest"
              width={1921}
              height={819}
              sizes="(min-width: 1536px) 155px, (min-width: 768px) 130px, 122px"
              loading="lazy"
              className={`hidden h-auto w-[105px] transition-all min-[380px]:w-[115px] sm:w-[122px] md:block md:w-[125px] lg:w-[125px] xl:w-[130px] 2xl:w-[155px] ${!isScrolled ? "drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]" : ""}`}
            />
          </Link>

          {/* Desktop Navigation Links + Enquire Now CTA */}
          <div className="hidden items-center lg:flex lg:gap-2 xl:gap-3 2xl:gap-4.5">
            <nav
              aria-label="Main Navigation"
              className="flex items-center lg:gap-1 xl:gap-1.5 2xl:gap-3"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return isActive ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="whitespace-nowrap font-semibold uppercase tracking-wide text-coral transition-colors text-[10.5px] px-1.5 py-1 lg:text-[11px] lg:px-2 lg:py-1 xl:text-[11.5px] xl:px-2.5 xl:py-1.5 2xl:text-[12.5px] 2xl:px-3 2xl:py-1.5"
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`whitespace-nowrap rounded-sm font-medium uppercase tracking-wide transition-colors text-[10.5px] px-1.5 py-1 lg:text-[11px] lg:px-2 lg:py-1 xl:text-[11.5px] xl:px-2.5 xl:py-1.5 2xl:text-[12.5px] 2xl:px-3 2xl:py-1.5 ${
                      isScrolled
                        ? "text-[#1a1a1a] hover:text-[#D6AC70]"
                        : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:text-[#D6AC70]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => openEnquiry("Enquire Now")}
              className="whitespace-nowrap rounded-full bg-coral px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_26px_rgba(232,115,74,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-coral-dark hover:shadow-[0_14px_30px_rgba(232,115,74,0.38)] xl:px-5 xl:py-2 xl:text-[11px]"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Right: Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${
                isScrolled
                  ? "border-gray-200 bg-gray-50 text-gray-800"
                  : "border-white/30 bg-black/30 text-white backdrop-blur-sm max-md:border-gray-200 max-md:bg-gray-50 max-md:text-gray-800"
              }`}
            >
              {isMobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Dropdown */}
        {isMobileMenuOpen && (
          <div className="animate-[enquiry-sheet-in_200ms_ease-out] border-t border-gray-100 bg-white px-6 py-6 shadow-xl lg:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`flex min-h-11 items-center justify-between rounded-lg px-4 py-3 text-sm font-medium uppercase transition-colors ${
                      isActive
                        ? "font-semibold text-coral"
                        : "text-gray-800 hover:bg-gray-50 hover:text-coral"
                    }`}
                  >
                    <span>{link.name}</span>
                    <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openEnquiry("Enquire Now");
                }}
                className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-coral px-5 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_26px_rgba(232,115,74,0.32)] transition hover:bg-coral-dark"
              >
                Enquire Now
              </button>
            </nav>
          </div>
        )}
      </header>

    </>
  );
}

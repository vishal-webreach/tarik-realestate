import { useState, useEffect, useRef } from "react";
import { navLinks, siteConfig } from "../../data/site-config";
import crest from "../../assets/branding/crest.png";
import wordmark from "../../assets/branding/wordmark.png";

export default function Header() {
  // TEMP: scroll-triggered color switching disabled — header stays in its
  // "scrolled" (cream bg) appearance permanently. To restore, remove the
  // hardcoded `true` below and un-comment the scroll listener useEffect.
  const [scrolled, setScrolled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 60);
  //   };
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-70 transition-all duration-500 ${
        scrolled
          ? "bg-cream/97 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-350 mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-gold"
            aria-label="Tarik Real Estate — Home"
          >
            {/* Logo mark + wordmark — both use the client's real logo artwork.
                A drop-shadow is applied only while unscrolled, since the
                header sits directly over a bright photo there and the
                logo's fixed bronze/gray tones would otherwise wash out. */}
            <div
              className="relative w-9 h-9 shrink-0 transition-[filter] duration-500"
              style={{
                filter: scrolled ? "none" : "drop-shadow(0 1px 3px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(0,0,0,0.25))",
              }}
            >
              <img src={crest.src} alt="" className="w-full h-full object-contain" />
            </div>
            <img
              src={wordmark.src}
              alt="Tarik Real Estate"
              className="h-7 sm:h-8 w-auto object-contain transition-[filter] duration-500"
              style={{
                filter: scrolled ? "none" : "drop-shadow(0 1px 3px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(0,0,0,0.25))",
              }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 hover:text-gold focus-visible:outline-gold ${
                  scrolled ? "text-charcoal-light" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* TEMP: "Let's Talk" CTA swapped for a direct-call button below.
                Restore by un-commenting this block and removing the phone
                button that follows.
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase border transition-all duration-300 focus-visible:outline-gold ${
                scrolled
                  ? "border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                  : "border-white/80 text-white hover:bg-white hover:text-charcoal"
              }`}
            >
              Let's Talk
            </a>
            */}
            <a
              href={siteConfig.contact.phoneHref}
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase border transition-all duration-300 focus-visible:outline-gold ${
                scrolled
                  ? "border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                  : "border-white/80 text-white hover:bg-white hover:text-charcoal"
              }`}
              aria-label={`Call ${siteConfig.agent.fullName} at ${siteConfig.contact.phone}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden="true">
                <path d="M1.5 3.5C1.5 2.4 2.4 1.5 3.5 1.5h.6c.4 0 .8.25.95.63l.9 2.1c.17.4.07.87-.25 1.17l-.7.65c.6 1.2 1.5 2.1 2.7 2.7l.65-.7c.3-.32.77-.42 1.17-.25l2.1.9c.38.15.63.55.63.95v.6c0 1.1-.9 2-2 2C4.4 12.5 1.5 9.6 1.5 3.5z" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {siteConfig.contact.phone}
            </a>

            {/* Mobile hamburger */}
            <button
              ref={btnRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] focus-visible:outline-gold rounded`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block h-[1.5px] w-6 transition-all duration-300 origin-center ${
                  scrolled ? "bg-charcoal" : "bg-white"
                } ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-6 transition-all duration-300 ${
                  scrolled ? "bg-charcoal" : "bg-white"
                } ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-6 transition-all duration-300 origin-center ${
                  scrolled ? "bg-charcoal" : "bg-white"
                } ${menuOpen ? "-rotate-45 translate-y-[-6.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`lg:hidden fixed inset-0 top-0 z-60 bg-charcoal transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col h-full pt-20 pb-10 px-8">
          {/* Close area at top */}
          <div className="flex justify-end mb-10">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white focus-visible:outline-gold rounded"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block py-4 border-b border-white/10 text-white/80 hover:text-gold font-serif text-2xl tracking-wide transition-colors duration-200 focus-visible:outline-gold"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            {/* TEMP: "Let's Talk" CTA swapped for a direct-call button below.
                Restore by un-commenting this block and removing the phone
                button that follows.
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 border border-gold text-gold text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gold hover:text-white transition-all duration-300 focus-visible:outline-white"
            >
              Let's Talk
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            */}
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 border border-gold text-gold text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gold hover:text-white transition-all duration-300 focus-visible:outline-white"
              aria-label={`Call ${siteConfig.agent.fullName} at ${siteConfig.contact.phone}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden="true">
                <path d="M1.5 3.5C1.5 2.4 2.4 1.5 3.5 1.5h.6c.4 0 .8.25.95.63l.9 2.1c.17.4.07.87-.25 1.17l-.7.65c.6 1.2 1.5 2.1 2.7 2.7l.65-.7c.3-.32.77-.42 1.17-.25l2.1.9c.38.15.63.55.63.95v.6c0 1.1-.9 2-2 2C4.4 12.5 1.5 9.6 1.5 3.5z" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {siteConfig.contact.phone}
            </a>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-medium">Tarik Real Estate</p>
              <p className="text-white/30 text-[10px] mt-1">Alexandria, Virginia</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

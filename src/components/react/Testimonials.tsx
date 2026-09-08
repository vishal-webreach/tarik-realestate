import { useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, visible } = useReveal();

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const active = testimonials[activeIndex];

  return (
    <section
      className="py-20 lg:py-32 px-6 lg:px-10 bg-charcoal"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-350 mx-auto">
        <div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""}`}
        >
          {/* Header */}
          <div className="mb-16">
            <span className="block w-10 h-px bg-gold mb-5" aria-hidden="true" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold mb-3">
              Testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="font-serif text-white text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight"
            >
              What Clients Say
            </h2>
          </div>

          {/* Featured testimonial */}
          <div className="relative">
            {/* Large quote mark */}
            <div className="absolute -top-6 -left-2 text-[120px] leading-none text-gold/15 font-serif select-none" aria-hidden="true">
              &ldquo;
            </div>

            <div className="lg:grid lg:grid-cols-3 gap-12 items-start">
              {/* Main quote */}
              <div className="lg:col-span-2 relative z-10">
                <blockquote
                  className="font-serif text-white text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed mb-8 italic"
                  aria-live="polite"
                >
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-gold" aria-hidden="true" />
                  <div>
                    <p className="text-white text-[13px] font-medium">{active.author}</p>
                    <p className="text-white/40 text-[11px] mt-0.5">{active.location} · {active.transaction}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4 mt-10">
                  <button
                    onClick={prev}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-colors duration-200 focus-visible:outline-gold"
                    aria-label="Previous testimonial"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2" aria-label="Testimonial navigation">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`transition-all duration-300 focus-visible:outline-gold ${
                          i === activeIndex
                            ? "w-6 h-[2px] bg-gold"
                            : "w-2 h-[2px] bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                        aria-current={i === activeIndex ? "true" : undefined}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-colors duration-200 focus-visible:outline-gold"
                    aria-label="Next testimonial"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* All testimonials as mini cards */}
              <div className="hidden lg:flex flex-col gap-4 mt-0">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveIndex(i)}
                    className={`text-left p-5 border transition-all duration-300 focus-visible:outline-gold ${
                      i === activeIndex
                        ? "border-gold/60 bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    aria-label={`View testimonial from ${t.author}`}
                  >
                    <p className={`text-[13px] leading-relaxed line-clamp-2 italic mb-3 ${i === activeIndex ? "text-white/80" : "text-white/40"}`}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className={`text-[11px] tracking-wide ${i === activeIndex ? "text-gold" : "text-white/25"}`}>
                      {t.author} · {t.transaction}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

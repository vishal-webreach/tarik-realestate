import { useEffect, useRef, useState } from "react";
import { featuredProperties, recentSales } from "../../data/properties";

type Variant = "buyer" | "seller" | "general";

interface OpenDetail {
  listingId?: string;
  variant?: Variant;
}

type Status = "idle" | "submitting" | "submitted";

const listings = [...featuredProperties, ...recentSales];

const copyByVariant: Record<Variant, { title: string; description: string }> = {
  buyer: {
    title: "Enquire About This Property",
    description: "Tell us a bit about yourself and we'll follow up with more details.",
  },
  seller: {
    title: "Submit Your Property",
    description:
      "Share your details and a short note about your property. An agent will review and reach out to discuss next steps.",
  },
  general: {
    title: "Let's Talk",
    description: "Have a question or want a free valuation? Send us a message.",
  },
};

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>("general");
  const [listingId, setListingId] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleOpen(event: Event) {
      const detail = (event as CustomEvent<OpenDetail>).detail ?? {};
      setVariant(detail.variant ?? "general");
      setListingId(detail.listingId);
      setStatus("idle");
      setIsOpen(true);
    }

    window.addEventListener("enquiry:open", handleOpen);
    return () => window.removeEventListener("enquiry:open", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      dialogRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const listing = listingId ? listings.find((item) => item.id === listingId) : undefined;
  const copy = copyByVariant[variant];

  // TODO(backend): Replace this stub with a real POST to the future PHP
  // endpoint, e.g. POST /api/enquiries.php.
  // Expected payload: { name, email, phone, message, listingId?, inquiryType: variant }
  // On success: show confirmation (already handled below).
  // On failure: surface an inline error state (not yet implemented).
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setStatus("submitted");
  }

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-charcoal/80 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        tabIndex={-1}
        className="w-full max-w-md bg-cream p-8 shadow-2xl outline-none animate-scale-in"
      >
        <div className="mb-1 flex items-start justify-between">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold">
            {variant === "buyer" ? "Enquiry" : variant === "seller" ? "Sellers" : "Contact"}
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
            className="-mt-1 -mr-1 w-8 h-8 flex items-center justify-center text-warm-gray-light hover:text-charcoal focus-visible:outline-gold transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <h2 id="enquiry-modal-title" className="font-serif text-charcoal text-2xl font-medium mb-4">
          {copy.title}
        </h2>

        {listing && (
          <p className="mb-5 border border-border bg-white px-3 py-2 text-[12px] text-warm-gray">
            Regarding: {listing.fullAddress}
          </p>
        )}

        {status === "submitted" ? (
          <p className="border border-border bg-white px-4 py-8 text-center text-charcoal font-serif text-lg">
            Thanks — we&rsquo;ll be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-[13px] text-warm-gray leading-relaxed">{copy.description}</p>
            <div>
              <label htmlFor="enquiry-name" className="block text-[10px] font-medium tracking-[0.2em] uppercase text-warm-gray mb-1.5">
                Name
              </label>
              <input
                id="enquiry-name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-white border border-border text-[13px] text-charcoal hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="enquiry-email" className="block text-[10px] font-medium tracking-[0.2em] uppercase text-warm-gray mb-1.5">
                Email
              </label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-white border border-border text-[13px] text-charcoal hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="enquiry-phone" className="block text-[10px] font-medium tracking-[0.2em] uppercase text-warm-gray mb-1.5">
                Phone
              </label>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                className="w-full px-4 py-3 bg-white border border-border text-[13px] text-charcoal hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="enquiry-message" className="block text-[10px] font-medium tracking-[0.2em] uppercase text-warm-gray mb-1.5">
                Message
              </label>
              <textarea
                id="enquiry-message"
                name="message"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-border text-[13px] text-charcoal hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-white text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300 focus-visible:outline-gold"
            >
              {status === "submitting" ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

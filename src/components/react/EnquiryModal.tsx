import { useEffect, useRef, useState } from "react";
import { featuredProperties, recentSales } from "../../data/properties";
import { HONEYPOT_FIELD, goToThankYou, submitEnquiry, validateEnquiryFields, type FieldError } from "../../lib/enquiryForm";

type Variant = "buyer" | "seller" | "renter" | "general";

interface OpenDetail {
  listingId?: string;
  variant?: Variant;
}

type Status = "idle" | "submitting" | "error";

// Feeds the "Enquiry Type" row in the agent notification email — labeling
// it "Enquiry — Buyer" there would read as "Enquiry Type: Enquiry — Buyer".
const sourceByVariant: Record<Variant, string> = {
  buyer: "Buyer",
  seller: "Seller",
  renter: "Renter",
  general: "General",
};

const listings = [...featuredProperties, ...recentSales];

const copyByVariant: Record<Variant, { title: string; description: string }> = {
  buyer: {
    title: "Share Your Details",
    description: "Tell us a bit about yourself and we'll follow up with more details.",
  },
  seller: {
    title: "Submit Your Property Details",
    description:
      "Share your details and a short note about your property. An agent will review and reach out to discuss next steps.",
  },
  renter: {
    title: "Find Your Rental Property",
    description:
      "Tell us your rental preferences and budget, and we'll help you find the right fit in Alexandria and the greater DMV area.",
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<FieldError["field"] | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const openedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    function handleOpen(event: Event) {
      const detail = (event as CustomEvent<OpenDetail>).detail ?? {};
      setVariant(detail.variant ?? "general");
      setListingId(detail.listingId);
      setStatus("idle");
      setErrorMessage(null);
      setErrorField(null);
      openedAtRef.current = Date.now();
      setIsOpen(true);
    }

    window.addEventListener("enquiry:open", handleOpen);
    return () => window.removeEventListener("enquiry:open", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      dialogRef.current?.focus({ preventScroll: true });
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      previouslyFocused.current?.focus({ preventScroll: true });
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "");

    const validationError = validateEnquiryFields({ name, email, phone, message });
    if (validationError) {
      setErrorMessage(validationError.message);
      setErrorField(validationError.field);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);
    setErrorField(null);

    const result = await submitEnquiry(
      { name, email, phone, message, source: sourceByVariant[variant], listingAddress: listing?.fullAddress },
      honeypot,
      openedAtRef.current
    );

    if (result.success) {
      goToThankYou(name);
      return;
    }

    setStatus("error");
    setErrorMessage(result.message ?? "Something went wrong. Please try again.");
  }

  const fieldClass = (field: FieldError["field"]) =>
    `w-full px-4 py-3 bg-white border text-[13px] text-charcoal focus:outline-none transition-colors duration-200 ${
      errorField === field
        ? "border-red-400 focus:border-red-500"
        : "border-border hover:border-gold focus:border-gold"
    }`;

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center bg-charcoal/80 p-4"
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
            {variant === "buyer"
              ? "Buyers"
              : variant === "seller"
                ? "Sellers"
                : variant === "renter"
                  ? "Renters"
                  : "Contact"}
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

        <form
          onSubmit={handleSubmit}
          noValidate
          onChange={(event) => {
            const target = event.target as HTMLElement;
            if ("name" in target && target.name === errorField) setErrorField(null);
          }}
          className="space-y-4"
        >
          <p className="text-[13px] text-warm-gray leading-relaxed">{copy.description}</p>

          {/* Honeypot — off-screen, not display:none (some bots skip hidden
             fields but still fill "visible" ones), real visitors never
             reach it via tab order or see it. */}
          <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
            <label htmlFor="enquiry-company">Leave this field empty</label>
            <input id="enquiry-company" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && errorMessage && (
            <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
              {errorMessage}
            </p>
          )}

          <div>
            <label htmlFor="enquiry-name" className="block text-[10px] font-medium tracking-[0.2em] uppercase text-warm-gray mb-1.5">
              Name
            </label>
            <input
              id="enquiry-name"
              name="name"
              type="text"
              required
              aria-invalid={errorField === "name"}
              className={fieldClass("name")}
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
              aria-invalid={errorField === "email"}
              className={fieldClass("email")}
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
              required
              aria-invalid={errorField === "phone"}
              className={fieldClass("phone")}
            />
          </div>
          <div>
            <label htmlFor="enquiry-message" className="block text-[10px] font-medium tracking-[0.2em] uppercase text-warm-gray mb-1.5">
              {variant === "seller" ? "Brief Info of Property" : "Message"}
            </label>
            <textarea
              id="enquiry-message"
              name="message"
              rows={3}
              required
              aria-invalid={errorField === "message"}
              className={fieldClass("message")}
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-white text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300 focus-visible:outline-gold disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                Sending
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" strokeDasharray="20" strokeDashoffset="10" />
                </svg>
              </>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

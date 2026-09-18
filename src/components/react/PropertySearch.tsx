import { useState, useRef, useEffect } from "react";
import { HONEYPOT_FIELD, goToThankYou, submitEnquiry, validateEnquiryFields, type FieldError } from "../../lib/enquiryForm";

type DropdownOption = { label: string; value: string };

const transactionTypes: DropdownOption[] = [
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
  { label: "Rent", value: "rent" },
];

const propertyTypes: DropdownOption[] = [
  { label: "Property Type", value: "" },
  { label: "Single Family", value: "single-family" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Condo", value: "condo" },
  { label: "Multi-Family", value: "multi-family" },
  { label: "Land", value: "land" },
];

function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  id,
  error,
}: {
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  id: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" id={id}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-invalid={error}
        className={`flex items-center justify-between gap-3 w-full h-full px-4 py-3.5 bg-white border text-left text-[13px] text-charcoal-light focus-visible:outline-gold transition-colors duration-200 cursor-pointer ${
          error ? "border-red-400 focus-visible:border-red-500" : "border-border hover:border-gold focus-visible:border-gold"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={placeholder}
      >
        <span className={selected ? "text-charcoal" : "text-warm-gray-light"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`shrink-0 text-gold transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-border shadow-lg z-50 animate-slide-down"
          role="listbox"
          aria-label={placeholder}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 text-[13px] hover:bg-cream hover:text-gold transition-colors duration-150 ${
                value === option.value ? "text-gold bg-cream" : "text-charcoal-light"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertySearch() {
  const [txType, setTxType] = useState("buy");
  const [location, setLocation] = useState("");
  const [propType, setPropType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<FieldError["field"] | null>(null);
  const renderedAtRef = useRef(Date.now());

  const fieldClass = (field: FieldError["field"]) =>
    `w-full px-4 py-3.5 bg-white border text-[13px] text-charcoal placeholder:text-warm-gray-light focus:outline-none transition-colors duration-200 ${
      errorField === field
        ? "border-red-400 focus:border-red-500"
        : "border-border hover:border-gold focus:border-gold"
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Location and property type only exist on this form (not the enquiry
    // modal), so they're checked here rather than in the shared validator —
    // same "nothing is optional" rule applies to them.
    if (location.trim() === "") {
      setErrorMessage("Please enter a location.");
      setErrorField("location");
      return;
    }
    if (propType.trim() === "") {
      setErrorMessage("Please select a property type.");
      setErrorField("propertyType");
      return;
    }

    const validationError = validateEnquiryFields({ name, email, phone, message });
    if (validationError) {
      setErrorMessage(validationError.message);
      setErrorField(validationError.field);
      return;
    }

    setErrorMessage(null);
    setErrorField(null);
    setSubmitted(true);

    const transactionLabel = transactionTypes.find((t) => t.value === txType)?.label;
    const propertyTypeLabel = propertyTypes.find((t) => t.value === propType)?.label;

    const result = await submitEnquiry(
      {
        name,
        email,
        phone,
        message,
        source: "Property Search",
        transactionType: transactionLabel,
        location,
        propertyType: propertyTypeLabel,
      },
      honeypot,
      renderedAtRef.current
    );

    if (result.success) {
      goToThankYou(name);
      return;
    }

    setSubmitted(false);
    setErrorMessage(result.message ?? "Something went wrong. Please try again.");
  };

  return (
    <section
      className="relative z-20 -mt-8 lg:-mt-12 pb-2 px-4 lg:px-10"
      aria-label="Property enquiry"
    >
      <div className="max-w-300 mx-auto">
        <div className="bg-white border border-border shadow-[0_8px_48px_rgba(0,0,0,0.08)]">
          {/* Header bar */}
          <div className="border-b border-border px-6 py-4">
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-warm-gray">
              What Are You Looking For?
            </p>
          </div>

          {/* Enquiry form */}
          <form onSubmit={handleSubmit} noValidate className="relative p-4 lg:p-6">
            {/* Honeypot — off-screen, not display:none (some bots skip hidden
               fields but still fill "visible" ones), real visitors never
               reach it via tab order or see it. */}
            <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
              <label htmlFor="search-company">Leave this field empty</label>
              <input
                id="search-company"
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p role="alert" className="mb-3 border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                {errorMessage}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Transaction type */}
              <div>
                <label className="sr-only" htmlFor="tx-type">Transaction type</label>
                <Dropdown
                  id="tx-type"
                  options={transactionTypes}
                  value={txType}
                  onChange={setTxType}
                  placeholder="Buy / Rent / Sell"
                />
              </div>

              {/* Location */}
              <div className="lg:col-span-2">
                <label className="sr-only" htmlFor="location-input">Location</label>
                <input
                  id="location-input"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errorField === "location") setErrorField(null);
                  }}
                  placeholder="City, Zip, or Address"
                  aria-invalid={errorField === "location"}
                  className={`h-full ${fieldClass("location")}`}
                />
              </div>

              {/* Property type */}
              <div>
                <label className="sr-only" htmlFor="prop-type">Property type</label>
                <Dropdown
                  id="prop-type"
                  options={propertyTypes}
                  value={propType}
                  onChange={(v) => {
                    setPropType(v);
                    if (errorField === "propertyType") setErrorField(null);
                  }}
                  placeholder="Property Type"
                  error={errorField === "propertyType"}
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div>
                <label className="sr-only" htmlFor="search-enquiry-name">Name</label>
                <input
                  id="search-enquiry-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorField === "name") setErrorField(null);
                  }}
                  placeholder="Full Name"
                  aria-invalid={errorField === "name"}
                  className={fieldClass("name")}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="search-enquiry-email">Email</label>
                <input
                  id="search-enquiry-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorField === "email") setErrorField(null);
                  }}
                  placeholder="Email Address"
                  aria-invalid={errorField === "email"}
                  className={fieldClass("email")}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="search-enquiry-phone">Phone</label>
                <input
                  id="search-enquiry-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errorField === "phone") setErrorField(null);
                  }}
                  placeholder="Phone Number"
                  aria-invalid={errorField === "phone"}
                  className={fieldClass("phone")}
                />
              </div>
            </div>

            {/* Additional info + submit */}
            <div className="mt-3 flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1">
                <label className="sr-only" htmlFor="search-enquiry-message">Additional info</label>
                <input
                  id="search-enquiry-message"
                  type="text"
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorField === "message") setErrorField(null);
                  }}
                  placeholder="Additional Info"
                  aria-invalid={errorField === "message"}
                  className={`h-full ${fieldClass("message")}`}
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className={`inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-gold group shrink-0 disabled:cursor-not-allowed ${
                  submitted
                    ? "bg-charcoal-light text-white"
                    : "bg-charcoal text-white hover:bg-gold"
                }`}
                aria-label="Submit enquiry"
              >
                {submitted ? (
                  <>
                    Submitting
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" strokeDasharray="20" strokeDashoffset="10" />
                    </svg>
                  </>
                ) : (
                  <>
                    Submit
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

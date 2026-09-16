import { useState, useRef, useEffect } from "react";

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
}: {
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  id: string;
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
        className="flex items-center justify-between gap-3 w-full h-full px-4 py-3.5 bg-white border border-border text-left text-[13px] text-charcoal-light hover:border-gold focus-visible:outline-gold focus-visible:border-gold transition-colors duration-200 cursor-pointer"
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
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
          <form onSubmit={handleSubmit} className="p-4 lg:p-6">
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Zip, or Address"
                  className="w-full h-full px-4 py-3.5 bg-white border border-border text-[13px] text-charcoal placeholder:text-warm-gray-light hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Property type */}
              <div>
                <label className="sr-only" htmlFor="prop-type">Property type</label>
                <Dropdown
                  id="prop-type"
                  options={propertyTypes}
                  value={propType}
                  onChange={setPropType}
                  placeholder="Property Type"
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
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3.5 bg-white border border-border text-[13px] text-charcoal placeholder:text-warm-gray-light hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="search-enquiry-email">Email</label>
                <input
                  id="search-enquiry-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-3.5 bg-white border border-border text-[13px] text-charcoal placeholder:text-warm-gray-light hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="search-enquiry-phone">Phone</label>
                <input
                  id="search-enquiry-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3.5 bg-white border border-border text-[13px] text-charcoal placeholder:text-warm-gray-light hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Additional Info"
                  className="w-full h-full px-4 py-3.5 bg-white border border-border text-[13px] text-charcoal placeholder:text-warm-gray-light hover:border-gold focus:border-gold focus:outline-none transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className={`inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-gold group shrink-0 ${
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

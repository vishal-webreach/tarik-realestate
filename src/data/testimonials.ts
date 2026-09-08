// ============================================================
// TESTIMONIALS DATA
// NOTE: These are SAMPLE/PLACEHOLDER testimonials only.
// Replace with verified real client testimonials before launch.
// ============================================================

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  transaction: "Buyer" | "Seller" | "Buyer & Seller";
  isPlaceholder: boolean; // true = sample content, not a real review
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Tarik made the entire process feel clear and straightforward. From our first conversation to closing day, we always felt informed and supported.",
    author: "James Carter",
    location: "Alexandria, VA",
    transaction: "Buyer",
    isPlaceholder: true,
  },
  {
    id: "t2",
    quote:
      "Selling our home was something we'd been putting off for years. Working with Tarik gave us the confidence to move forward, and the result exceeded our expectations.",
    author: "Robert Nguyen",
    location: "Fairfax County, VA",
    transaction: "Seller",
    isPlaceholder: true,
  },
  {
    id: "t3",
    quote:
      "We relocated from out of state and needed someone who truly knew the Northern Virginia market. Tarik's local knowledge and patience made a huge difference.",
    author: "Amanda Whitfield",
    location: "Northern Virginia",
    transaction: "Buyer",
    isPlaceholder: true,
  },
];

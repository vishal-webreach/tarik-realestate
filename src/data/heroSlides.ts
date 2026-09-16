// ============================================================
// HERO SLIDER DATA
// Each slide pairs a background photo with its own headline,
// subheading, and CTAs. Add/remove entries here — the Hero
// component and its slider script adapt automatically.
// ============================================================

import brickMansion from "../assets/photos/brickMansion.jpg";
import suburbanHome from "../assets/photos/suburbanHome.jpg";
import livingRoom from "../assets/photos/livingRoom.jpg";

// A CTA either navigates to a section (`href`) or opens the shared enquiry
// modal with the given `variant` — never both.
export type HeroCta =
  | { label: string; href: string; variant?: never }
  | { label: string; href?: never; variant: "buyer" | "seller" | "renter" | "general" };

export interface HeroSlide {
  id: string;
  image: ImageMetadata;
  imageAlt: string;
  eyebrow: string;
  heading: string[];
  emphasis: string;
  subheading: string[];
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "buy",
    image: brickMansion,
    imageAlt: "Elegant brick mansion with manicured lawn in Alexandria, Virginia",
    eyebrow: "Alexandria · Northern Virginia · DMV",
    heading: ["Find Your", "Next Place"],
    emphasis: "to Call Home.",
    subheading: ["Local expertise. Personal service.", "Real estate with a better approach."],
    primaryCta: { label: "Explore Properties", href: "#properties" },
    secondaryCta: { label: "Contact Us", variant: "general" },
  },
  {
    id: "sell",
    image: suburbanHome,
    imageAlt: "Well-maintained suburban home representative of Northern Virginia listings",
    eyebrow: "Thinking Of Selling",
    heading: ["Get Top Value", "for Your"],
    emphasis: "Current Home.",
    subheading: ["Strategic pricing. Proven marketing.", "A smoother sale from list to close."],
    primaryCta: { label: "Explore Properties", href: "#properties" },
    secondaryCta: { label: "Contact Us", variant: "general" },
  },
  {
    id: "listings",
    image: livingRoom,
    imageAlt: "Bright, staged living room in a Northern Virginia listing",
    eyebrow: "Featured Listings · Updated Weekly",
    heading: ["Discover Homes", "Curated for"],
    emphasis: "Every Lifestyle.",
    subheading: ["Move-in ready homes across the DMV.", "New listings added every week."],
    primaryCta: { label: "Explore Properties", href: "#properties" },
    secondaryCta: { label: "Contact Us", variant: "general" },
  },
];

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
    subheading: ["Trusted guidance for buying, renting and investing right here in Northern Virginia and beyond."],
    primaryCta: { label: "Explore Properties", href: "#properties" },
    secondaryCta: { label: "Contact Us", variant: "general" },
  },
  {
    id: "sell",
    image: suburbanHome,
    imageAlt: "Well-maintained suburban home representative of Northern Virginia listings",
    eyebrow: "Thinking Of Selling",
    heading: ["Position Your Property"],
    emphasis: "for Its Next Chapter.",
    subheading: ["Tarik provides thoughtful guidance from preparation and pricing strategy through negotiation and closing."],
    primaryCta: { label: "Explore Properties", href: "#properties" },
    secondaryCta: { label: "Contact Us", variant: "general" },
  },
  {
    id: "relocate",
    image: livingRoom,
    imageAlt: "Bright, staged living room in a Northern Virginia home",
    eyebrow: "Relocating & Moving",
    heading: ["Relocating or"],
    emphasis: "Moving?",
    subheading: [
      "Tarik helps families understand communities, evaluate properties, and navigate the transition with personalized guidance from start to finish.",
    ],
    primaryCta: { label: "Explore Properties", href: "#properties" },
    secondaryCta: { label: "Contact Us", variant: "general" },
  },
];

// ============================================================================
// SITE CONFIG — centralizes values the reference design repeated inline
// (nav links appeared in both Header and Footer; contact info is still
// unconfirmed). Update the PRE-LAUNCH fields below before going live.
//   [x] contact.phone — confirmed from client-supplied profile poster
//   [x] contact.email — confirmed
//   [ ] agent.licenseNumber — not yet supplied
// ============================================================================

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Properties", href: "#properties" },
  { label: "Buy", href: "#buy-sell" },
  { label: "Sell", href: "#sell" },
  { label: "About", href: "#about" },
  { label: "Areas", href: "#areas" },
  { label: "Resources", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export const siteConfig = {
  business: {
    name: "Tarik Real Estate",
    tagline: "Alexandria · Northern Virginia · DMV",
  },
  agent: {
    name: "Tarik",
    fullName: "Tarik Jabrane",
    title: "REALTOR®",
    licenseNumber: "VA License #000000", // TODO: CLIENT TO CONFIRM
  },
  contact: {
    phone: "703-862-1119",
    phoneHref: "tel:+17038621119",
    email: "tarikrealestate@gmail.com",
    location: "Alexandria, Virginia",
    serviceArea: "Serving the Northern Virginia & DMV area",
  },
  areasServed: ["Alexandria", "Northern Virginia", "Fairfax County", "Arlington", "Washington DC Metro"],
} as const;

// ============================================================================
// SITE CONFIG — centralizes values the reference design repeated inline
// (nav links appeared in both Header and Footer; contact info is still
// unconfirmed). Update the PRE-LAUNCH fields below before going live.
//   [x] contact.phone — confirmed from client-supplied profile poster
//   [x] contact.email — confirmed
//   [ ] agent.licenseNumber — not yet supplied
//   [x] forms.endpoint — pointed at tarikrealestate.com; still assumes the
//       PHP backend is hosted on that same domain — confirm and adjust if
//       /server actually lives on a different host (see /server/README.md)
//   [x] astro.config.mjs `site`/`base` — set to tarikrealestate.com / '/'
//   [ ] seoConfig.twitterHandle — add if/when a social handle exists
//   [x] BaseLayout.astro robots meta — now "index, follow" site-wide
// ============================================================================

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Properties", href: "#properties" },
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
  socialLinks: {
    facebook: "https://www.facebook.com/share/1JFwnksybs/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/jabrane_real_estate_group?stkn=bW1zdXpvZGgwNHk4&utm_source=qr",
    tiktok: "https://www.tiktok.com/@tarikjabranerealtor?_r=1&_t=ZT-99scq4MAaC5",
  },
} as const;

export const formsConfig = {
  // PHP + SendGrid form handler (source in /server). Assumes /server is
  // deployed at this same domain — update if it ends up hosted elsewhere.
  endpoint: "https://tarikrealestate.com/server/enquiry.php",
} as const;

export const seoConfig = {
  defaultDescription:
    "Tarik Real Estate offers expert buying and selling guidance in Alexandria, Virginia and the Northern Virginia DMV area. Local knowledge, personal service, and strategic real estate expertise.",
  keywords: [
    "Alexandria Virginia real estate",
    "Northern Virginia realtor",
    "DMV homes for sale",
    "Alexandria VA REALTOR",
    "Fairfax County real estate",
    "Arlington VA homes",
  ],
  twitterHandle: undefined as string | undefined, // TODO: CLIENT TO CONFIRM — social handles, if any
} as const;

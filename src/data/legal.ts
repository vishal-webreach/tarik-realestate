// ============================================================
// LEGAL CONTENT (Privacy Policy / Terms)
// NOTE: Placeholder boilerplate only — replace with attorney-reviewed
// text before launch.
// ============================================================

export interface LegalDoc {
  id: "privacy" | "terms";
  title: string;
  updatedAt: string;
  sections: { heading: string; body: string[] }[];
}

export const legalDocs: LegalDoc[] = [
  {
    id: "privacy",
    title: "Privacy Policy",
    updatedAt: "2026-01-01",
    sections: [
      {
        heading: "Information We Collect",
        body: [
          "When you submit an enquiry, contact form, or request a valuation through this site, we collect the details you provide — such as your name, email, phone number, and any message you include.",
          "We may also collect basic technical information, like browser type and pages visited, to help us understand how the site is used.",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: [
          "Information you submit is used to respond to your enquiry, follow up about a property or listing, and provide the real estate services you've requested.",
          "We do not sell your personal information to third parties.",
        ],
      },
      {
        heading: "Sharing Your Information",
        body: [
          "Your information may be shared with service providers who help us operate this site or process enquiries (such as email or CRM tools), and only to the extent necessary to provide our services.",
        ],
      },
      {
        heading: "Your Choices",
        body: [
          "You can request that we update or delete the information we hold about you at any time by contacting us directly using the details in the Contact section of this site.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about this privacy policy can be directed to Tarik Real Estate using the contact information provided on this site.",
        ],
      },
    ],
  },
  {
    id: "terms",
    title: "Terms of Use",
    updatedAt: "2026-01-01",
    sections: [
      {
        heading: "Acceptance of Terms",
        body: [
          "By using this website, you agree to these terms of use. If you do not agree, please discontinue use of the site.",
        ],
      },
      {
        heading: "Use of Content",
        body: [
          "The content on this site — including text, images, and property information — is provided for informational purposes and may not be reproduced or redistributed without permission.",
        ],
      },
      {
        heading: "Property Listings",
        body: [
          "Property details, pricing, and availability shown on this site are subject to change without notice and should be independently verified before making any decisions.",
        ],
      },
      {
        heading: "No Warranty",
        body: [
          "This site and its content are provided \"as is\" without warranties of any kind, express or implied, regarding accuracy, completeness, or fitness for a particular purpose.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about these terms can be directed to Tarik Real Estate using the contact information provided on this site.",
        ],
      },
    ],
  },
];

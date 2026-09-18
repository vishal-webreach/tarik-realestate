import { formsConfig } from "../data/site-config";
import { BASE_URL } from "./baseUrl";

// Name deliberately looks like a normal field ("company website") so
// scripted bots are more likely to autofill it — real visitors never see it
// (off-screen, aria-hidden). Any submission with this filled in is spam.
export const HONEYPOT_FIELD = "company_website";

export interface EnquiryFields {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  listingAddress?: string;
  transactionType?: string;
  location?: string;
  propertyType?: string;
}

export interface SubmitResult {
  success: boolean;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s().]{7,30}$/;

export interface FieldError {
  field: "name" | "email" | "phone";
  message: string;
}

export function validateEnquiryFields(fields: { name: string; email: string; phone?: string }): FieldError | null {
  if (fields.name.trim().length < 2) return { field: "name", message: "Please enter your name." };
  if (!EMAIL_PATTERN.test(fields.email.trim())) {
    return { field: "email", message: "Please enter a valid email address." };
  }
  if (fields.phone && fields.phone.trim() !== "" && !PHONE_PATTERN.test(fields.phone.trim())) {
    return { field: "phone", message: "Please enter a valid phone number." };
  }
  return null;
}

// `renderedAtMs` is when the form first became visible to the visitor — the
// backend rejects submissions that arrive implausibly fast as likely bots.
export async function submitEnquiry(
  fields: EnquiryFields,
  honeypotValue: string,
  renderedAtMs: number
): Promise<SubmitResult> {
  try {
    const response = await fetch(formsConfig.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, hp_field: honeypotValue, ts: renderedAtMs }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success) {
      return { success: false, message: data?.message ?? "Something went wrong. Please try again or call us directly." };
    }
    return { success: true };
  } catch {
    return { success: false, message: "Network error — please check your connection and try again." };
  }
}

// Full-page redirect (not client-side routing — this is a static multi-page
// Astro site) to the thank-you page, which itself redirects home after 5s.
export function goToThankYou(name: string) {
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  const query = firstName ? `?name=${encodeURIComponent(firstName)}` : "";
  window.location.href = `${BASE_URL}thank-you/${query}`;
}

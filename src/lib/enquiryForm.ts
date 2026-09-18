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

// Requires a real-shaped TLD (2+ letters) — the previous pattern accepted
// anything after the last dot, so "name@gmail.c" passed as valid.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
// Only these characters are allowed in a phone field at all (no letters).
const PHONE_CHARS_PATTERN = /^[0-9+\-\s().]+$/;

function countPhoneDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

// Checks digit COUNT, not string length — the previous check only required
// 7-30 characters total, so "123-4567" (7 digits) or even shorter strings
// padded with formatting characters passed as a "valid" phone number.
// 10-15 digits covers a US number (10, or 11 with a leading "1") through a
// full international number in E.164 format (max 15 digits).
function isValidPhone(value: string): boolean {
  if (!PHONE_CHARS_PATTERN.test(value)) return false;
  const digits = countPhoneDigits(value);
  return digits >= 10 && digits <= 15;
}

export type FieldName = "name" | "email" | "phone" | "message" | "location" | "propertyType";

export interface FieldError {
  field: FieldName;
  message: string;
}

// Every field here is mandatory on purpose — this project's forms have no
// optional fields, not even phone or the message/details box.
export function validateEnquiryFields(fields: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): FieldError | null {
  if (fields.name.trim().length < 2) return { field: "name", message: "Please enter your name." };
  if (!EMAIL_PATTERN.test(fields.email.trim())) {
    return { field: "email", message: "Please enter a valid email address." };
  }
  if (fields.phone.trim() === "") return { field: "phone", message: "Please enter your phone number." };
  if (!isValidPhone(fields.phone.trim())) {
    return { field: "phone", message: "Please enter a valid phone number (at least 10 digits)." };
  }
  if (fields.message.trim().length === 0) return { field: "message", message: "Please enter a message." };
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

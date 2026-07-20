/** Gravity Form–equivalent inquiry forms (live GF #87, #86, #23). */

export const FORM_IDS = [
  "contact-inquiry",
  "junior-inquiry",
  "ambassador",
] as const;

export type FormId = (typeof FORM_IDS)[number];

export const CONTACT_FORM_PAGE_SLUGS = [
  "adult-programs",
  "junior-programs-2",
  "junior-programs-2-copy",
  "become-an-esc-club-ambassador",
] as const;

export type ContactFormPageSlug = (typeof CONTACT_FORM_PAGE_SLUGS)[number];

export const FORM_ID_BY_PAGE: Record<ContactFormPageSlug, FormId> = {
  "adult-programs": "contact-inquiry",
  "junior-programs-2-copy": "contact-inquiry",
  "junior-programs-2": "junior-inquiry",
  "become-an-esc-club-ambassador": "ambassador",
};

export const SUBJECT_PREFIX_BY_PAGE: Record<ContactFormPageSlug, string> = {
  "adult-programs": "[ESC Adult Programs]",
  "junior-programs-2-copy": "[ESC Lesson Packages]",
  "junior-programs-2": "[ESC Junior Programs]",
  "become-an-esc-club-ambassador": "[ESC Ambassador]",
};

export const PLAY_LEVELS = [
  "Beginner",
  "E",
  "D",
  "C",
  "B",
  "A",
  "Open",
] as const;

export const AVAILABILITY_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const TIME_OF_DAY_OPTIONS = [
  "Early Morning",
  "Later Morning",
  "Afternoons",
  "Early Evenings",
  "Later Evenings",
] as const;

export const PREFERRED_CONTACT_OPTIONS = [
  "Email",
  "Text",
  "Phone Call",
] as const;

export type ContactInquiryFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type JuniorInquiryFields = {
  firstName: string;
  lastName: string;
  email: string;
};

export type AmbassadorFields = {
  name: string;
  email: string;
  phone: string;
  levelOfPlay: string;
  availabilityDays: string[];
  timeOfDay: string[];
  preferredContact: string;
  comments: string;
};

/** Server-side length caps to keep emails sane and reject abusive payloads. */
export const MAX_LENGTHS = {
  name: 200,
  email: 254,
  phone: 50,
  shortText: 200,
  longText: 5000,
} as const;

export type ContactFormFields =
  | ContactInquiryFields
  | JuniorInquiryFields
  | AmbassadorFields;

export type ValidatedContactPayload = {
  formId: FormId;
  pageSlug: ContactFormPageSlug;
  fields: ContactFormFields;
  replyTo?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function tooLong(value: string, max: number): boolean {
  return value.length > max;
}

/** Strip CR/LF (and collapse whitespace) so values can't break the subject line. */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isFormId(value: unknown): value is FormId {
  return typeof value === "string" && (FORM_IDS as readonly string[]).includes(value);
}

function isPageSlug(value: unknown): value is ContactFormPageSlug {
  return (
    typeof value === "string" &&
    (CONTACT_FORM_PAGE_SLUGS as readonly string[]).includes(value)
  );
}

function fullNameFromParts(firstName: string, lastName: string): string {
  return [firstName, lastName].filter(Boolean).join(" ");
}

export function validateContactPayload(
  body: unknown,
): { ok: true; data: ValidatedContactPayload } | { ok: false; error: string } {
  const record = asRecord(body);
  if (!record) {
    return { ok: false, error: "Invalid request body." };
  }

  if (!isFormId(record.formId)) {
    return { ok: false, error: "Unknown form." };
  }

  if (!isPageSlug(record.pageSlug)) {
    return { ok: false, error: "Unknown page." };
  }

  if (FORM_ID_BY_PAGE[record.pageSlug] !== record.formId) {
    return { ok: false, error: "Form does not match page." };
  }

  const fieldsRecord = asRecord(record.fields);
  if (!fieldsRecord) {
    return { ok: false, error: "Missing fields." };
  }

  if (record.formId === "contact-inquiry") {
    const firstName = asString(fieldsRecord.firstName);
    const lastName = asString(fieldsRecord.lastName);
    const email = asString(fieldsRecord.email);
    const phone = asString(fieldsRecord.phone);
    const message = asString(fieldsRecord.message);

    if (!firstName || !lastName) {
      return { ok: false, error: "Please enter your first and last name." };
    }
    if (
      tooLong(firstName, MAX_LENGTHS.shortText) ||
      tooLong(lastName, MAX_LENGTHS.shortText)
    ) {
      return { ok: false, error: "Your name is too long." };
    }
    if (!email || !EMAIL_RE.test(email) || tooLong(email, MAX_LENGTHS.email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (tooLong(phone, MAX_LENGTHS.phone)) {
      return { ok: false, error: "Your phone number is too long." };
    }
    if (tooLong(message, MAX_LENGTHS.longText)) {
      return { ok: false, error: "Your message is too long." };
    }

    return {
      ok: true,
      data: {
        formId: record.formId,
        pageSlug: record.pageSlug,
        replyTo: email,
        fields: { firstName, lastName, email, phone, message },
      },
    };
  }

  if (record.formId === "junior-inquiry") {
    const firstName = asString(fieldsRecord.firstName);
    const lastName = asString(fieldsRecord.lastName);
    const email = asString(fieldsRecord.email);

    if (!firstName || !lastName) {
      return { ok: false, error: "Please enter your first and last name." };
    }
    if (
      tooLong(firstName, MAX_LENGTHS.shortText) ||
      tooLong(lastName, MAX_LENGTHS.shortText)
    ) {
      return { ok: false, error: "Your name is too long." };
    }
    if (!email || !EMAIL_RE.test(email) || tooLong(email, MAX_LENGTHS.email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }

    return {
      ok: true,
      data: {
        formId: record.formId,
        pageSlug: record.pageSlug,
        replyTo: email,
        fields: { firstName, lastName, email },
      },
    };
  }

  const name = asString(fieldsRecord.name);
  const email = asString(fieldsRecord.email);
  const phone = asString(fieldsRecord.phone);
  const levelOfPlay = asString(fieldsRecord.levelOfPlay);
  const availabilityDays = asStringArray(fieldsRecord.availabilityDays);
  const timeOfDay = asStringArray(fieldsRecord.timeOfDay);
  const preferredContact = asString(fieldsRecord.preferredContact);
  const comments = asString(fieldsRecord.comments);

  if (!name) {
    return { ok: false, error: "Please enter your name." };
  }
  if (tooLong(name, MAX_LENGTHS.name)) {
    return { ok: false, error: "Your name is too long." };
  }
  if (!email || !EMAIL_RE.test(email) || tooLong(email, MAX_LENGTHS.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (tooLong(phone, MAX_LENGTHS.phone)) {
    return { ok: false, error: "Your phone number is too long." };
  }
  if (tooLong(comments, MAX_LENGTHS.longText)) {
    return { ok: false, error: "Your comments are too long." };
  }
  if (
    levelOfPlay &&
    !(PLAY_LEVELS as readonly string[]).includes(levelOfPlay)
  ) {
    return { ok: false, error: "Please choose a valid level of play." };
  }
  if (availabilityDays.length === 0) {
    return { ok: false, error: "Please select at least one available day." };
  }
  if (
    availabilityDays.some(
      (day) => !(AVAILABILITY_DAYS as readonly string[]).includes(day),
    )
  ) {
    return { ok: false, error: "Please choose valid availability days." };
  }
  if (timeOfDay.length === 0) {
    return { ok: false, error: "Please select at least one time of day." };
  }
  if (
    timeOfDay.some(
      (slot) => !(TIME_OF_DAY_OPTIONS as readonly string[]).includes(slot),
    )
  ) {
    return { ok: false, error: "Please choose valid times of day." };
  }
  if (!preferredContact) {
    return { ok: false, error: "Please choose a preferred contact method." };
  }
  if (!(PREFERRED_CONTACT_OPTIONS as readonly string[]).includes(preferredContact)) {
    return { ok: false, error: "Please choose a valid contact method." };
  }

  return {
    ok: true,
    data: {
      formId: record.formId,
      pageSlug: record.pageSlug,
      replyTo: email,
      fields: {
        name,
        email,
        phone,
        levelOfPlay,
        availabilityDays,
        timeOfDay,
        preferredContact,
        comments,
      },
    },
  };
}

export function contactDisplayName(payload: ValidatedContactPayload): string {
  const { fields } = payload;
  if ("name" in fields) return fields.name;
  return fullNameFromParts(fields.firstName, fields.lastName);
}

export function formatContactEmail(payload: ValidatedContactPayload): {
  subject: string;
  text: string;
} {
  const prefix = SUBJECT_PREFIX_BY_PAGE[payload.pageSlug];
  const name = sanitizeHeader(contactDisplayName(payload));
  const subject = `${prefix} ${name}`.trim();

  const lines: string[] = [
    `Form: ${payload.formId}`,
    `Page: /${payload.pageSlug}/`,
    "",
  ];

  if (payload.formId === "contact-inquiry") {
    const f = payload.fields as ContactInquiryFields;
    lines.push(
      `Name: ${fullNameFromParts(f.firstName, f.lastName)}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone || "(not provided)"}`,
      "",
      "What can we help you with?",
      f.message || "(not provided)",
    );
  } else if (payload.formId === "junior-inquiry") {
    const f = payload.fields as JuniorInquiryFields;
    lines.push(
      `Name: ${fullNameFromParts(f.firstName, f.lastName)}`,
      `Email: ${f.email}`,
    );
  } else {
    const f = payload.fields as AmbassadorFields;
    lines.push(
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone || "(not provided)"}`,
      `Level of play: ${f.levelOfPlay || "(not provided)"}`,
      `Availability – days: ${f.availabilityDays.join(", ")}`,
      `Availability – time of day: ${f.timeOfDay.join(", ")}`,
      `Preferred contact: ${f.preferredContact}`,
      "",
      "Comments:",
      f.comments || "(not provided)",
    );
  }

  return { subject, text: lines.join("\n") };
}

export function isHoneypotTriggered(body: unknown): boolean {
  const record = asRecord(body);
  return Boolean(record && asString(record.website).length > 0);
}

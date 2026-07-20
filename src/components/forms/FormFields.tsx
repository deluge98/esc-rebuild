"use client";

import type { ReactNode } from "react";

export const fieldClassName =
  "mt-1 w-full border border-gray-300 bg-white px-3 py-2 font-body text-base text-esc-black outline-none transition-colors focus:border-esc-red focus:ring-1 focus:ring-esc-red";

export const labelClassName =
  "block font-body text-sm font-semibold text-esc-black";

export function RequiredMark() {
  return (
    <span className="text-esc-red" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 font-body text-sm text-esc-red" role="alert">
      {message}
    </p>
  );
}

export function FormStatus({
  status,
  error,
}: {
  status: "idle" | "submitting" | "success" | "error";
  error?: string;
}) {
  if (status === "success") {
    return (
      <p
        className="mt-4 rounded-sm border border-green-200 bg-green-50 px-4 py-3 font-body text-sm text-green-800"
        role="status"
      >
        Thanks — we&apos;ll get back to you.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p
        className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-esc-red"
        role="alert"
      >
        {error || "Something went wrong. Please try again."}
      </p>
    );
  }

  return null;
}

export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export function SubmitButton({
  disabled,
  children = "Submit",
}: {
  disabled?: boolean;
  children?: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-full bg-esc-red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-esc-red-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function NameRow({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  required = true,
  disabled,
  maxLength,
}: {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className={labelClassName}>
        Name
        {required ? <RequiredMark /> : null}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required={required}
            maxLength={maxLength}
            disabled={disabled}
            value={firstName}
            onChange={(event) => onFirstNameChange(event.target.value)}
            className={fieldClassName}
            placeholder="First"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required={required}
            maxLength={maxLength}
            disabled={disabled}
            value={lastName}
            onChange={(event) => onLastNameChange(event.target.value)}
            className={fieldClassName}
            placeholder="Last"
          />
        </div>
      </div>
    </fieldset>
  );
}

export async function submitContactForm(payload: {
  formId: string;
  pageSlug: string;
  fields: Record<string, unknown>;
  website: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        error: data?.error || "Something went wrong. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

"use client";

import { useState, type FormEvent } from "react";
import {
  FieldError,
  FormStatus,
  HoneypotField,
  NameRow,
  RequiredMark,
  SubmitButton,
  fieldClassName,
  labelClassName,
  submitContactForm,
} from "@/components/forms/FormFields";
import { MAX_LENGTHS, type ContactFormPageSlug } from "@/data/contact-forms";

type Props = {
  pageSlug: Extract<
    ContactFormPageSlug,
    "adult-programs" | "junior-programs-2-copy"
  >;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactInquiryForm({ pageSlug }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | undefined>();

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!firstName.trim() || !lastName.trim()) {
      next.name = "Please enter your first and last name.";
    }
    if (!EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setError("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setError(undefined);

    const result = await submitContactForm({
      formId: "contact-inquiry",
      pageSlug,
      website,
      fields: { firstName, lastName, email, phone, message },
    });

    if (!result.ok) {
      setStatus("error");
      setError(result.error);
      return;
    }

    setStatus("success");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setWebsite("");
    setErrors({});
  }

  const disabled = status === "submitting" || status === "success";

  return (
    <form onSubmit={onSubmit} className="relative mt-8 max-w-xl space-y-5" noValidate>
      <HoneypotField value={website} onChange={setWebsite} />

      <div>
        <NameRow
          firstName={firstName}
          lastName={lastName}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          disabled={disabled}
          maxLength={MAX_LENGTHS.shortText}
        />
        <FieldError message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
          <RequiredMark />
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={MAX_LENGTHS.email}
          disabled={disabled}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClassName}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label htmlFor="phone" className={labelClassName}>
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={MAX_LENGTHS.phone}
          disabled={disabled}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={fieldClassName}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          What can we help you with?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MAX_LENGTHS.longText}
          disabled={disabled}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={fieldClassName}
        />
      </div>

      <SubmitButton disabled={disabled}>
        {status === "submitting" ? "Sending…" : "Submit"}
      </SubmitButton>

      <FormStatus status={status} error={error} />
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import {
  FieldError,
  FormStatus,
  HoneypotField,
  RequiredMark,
  SubmitButton,
  fieldClassName,
  labelClassName,
  submitContactForm,
} from "@/components/forms/FormFields";
import {
  AVAILABILITY_DAYS,
  MAX_LENGTHS,
  PLAY_LEVELS,
  PREFERRED_CONTACT_OPTIONS,
  TIME_OF_DAY_OPTIONS,
} from "@/data/contact-forms";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export default function AmbassadorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [levelOfPlay, setLevelOfPlay] = useState("");
  const [availabilityDays, setAvailabilityDays] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState("");
  const [comments, setComments] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | undefined>();

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!name.trim()) {
      next.name = "Please enter your name.";
    }
    if (!EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (availabilityDays.length === 0) {
      next.availabilityDays = "Please select at least one day.";
    }
    if (timeOfDay.length === 0) {
      next.timeOfDay = "Please select at least one time of day.";
    }
    if (!preferredContact) {
      next.preferredContact = "Please choose a preferred contact method.";
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
      formId: "ambassador",
      pageSlug: "become-an-esc-club-ambassador",
      website,
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
    });

    if (!result.ok) {
      setStatus("error");
      setError(result.error);
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setPhone("");
    setLevelOfPlay("");
    setAvailabilityDays([]);
    setTimeOfDay([]);
    setPreferredContact("");
    setComments("");
    setWebsite("");
    setErrors({});
  }

  const disabled = status === "submitting" || status === "success";

  return (
    <form onSubmit={onSubmit} className="relative mt-8 max-w-xl space-y-6" noValidate>
      <HoneypotField value={website} onChange={setWebsite} />

      <div>
        <label htmlFor="name" className={labelClassName}>
          Name
          <RequiredMark />
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={MAX_LENGTHS.name}
          disabled={disabled}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClassName}
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
        <label htmlFor="levelOfPlay" className={labelClassName}>
          Level of Play
        </label>
        <p className="mt-1 font-body text-sm text-gray-600">
          Choose one that you feel best fits
        </p>
        <select
          id="levelOfPlay"
          name="levelOfPlay"
          disabled={disabled}
          value={levelOfPlay}
          onChange={(event) => setLevelOfPlay(event.target.value)}
          className={fieldClassName}
        >
          <option value="">Select…</option>
          {PLAY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClassName}>
          Availability – Days
          <RequiredMark />
        </legend>
        <p className="mt-1 font-body text-sm text-gray-600">
          Let us know what days work best for you
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {AVAILABILITY_DAYS.map((day) => (
            <label
              key={day}
              className="flex items-center gap-2 font-body text-sm text-esc-black"
            >
              <input
                type="checkbox"
                name="availabilityDays"
                value={day}
                disabled={disabled}
                checked={availabilityDays.includes(day)}
                onChange={() =>
                  setAvailabilityDays((current) => toggleValue(current, day))
                }
                className="size-4 accent-esc-red"
              />
              {day}
            </label>
          ))}
        </div>
        <FieldError message={errors.availabilityDays} />
      </fieldset>

      <fieldset>
        <legend className={labelClassName}>
          Availability – Time of Day
          <RequiredMark />
        </legend>
        <p className="mt-1 font-body text-sm text-gray-600">
          Give us a rough idea of when you may be available to play
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {TIME_OF_DAY_OPTIONS.map((slot) => (
            <label
              key={slot}
              className="flex items-center gap-2 font-body text-sm text-esc-black"
            >
              <input
                type="checkbox"
                name="timeOfDay"
                value={slot}
                disabled={disabled}
                checked={timeOfDay.includes(slot)}
                onChange={() =>
                  setTimeOfDay((current) => toggleValue(current, slot))
                }
                className="size-4 accent-esc-red"
              />
              {slot}
            </label>
          ))}
        </div>
        <FieldError message={errors.timeOfDay} />
      </fieldset>

      <fieldset>
        <legend className={labelClassName}>
          Preferred method of contact
          <RequiredMark />
        </legend>
        <div className="mt-3 space-y-2">
          {PREFERRED_CONTACT_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 font-body text-sm text-esc-black"
            >
              <input
                type="radio"
                name="preferredContact"
                value={option}
                disabled={disabled}
                checked={preferredContact === option}
                onChange={() => setPreferredContact(option)}
                className="size-4 accent-esc-red"
              />
              {option}
            </label>
          ))}
        </div>
        <FieldError message={errors.preferredContact} />
      </fieldset>

      <div>
        <label htmlFor="comments" className={labelClassName}>
          Comments
        </label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          maxLength={MAX_LENGTHS.longText}
          disabled={disabled}
          value={comments}
          onChange={(event) => setComments(event.target.value)}
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

import {
  CATCH_CORNER_BOOKING_URL,
  CLUB_EMAIL,
  CLUB_PHONE,
  CLUB_PHONE_TEL,
  COURT_RESERVE_LOGIN_URL,
} from "@/lib/constants";
import { PageHeader } from "@/components/PageContent";

export default function CourtBookingCalendar() {
  return (
    <div>
      <PageHeader title="Current Court Booking Calendar" />
      <div className="space-y-4 text-gray-700">
        <p>
          For privacy reasons, the booking interface with names is only available
          to members. Members can log in to Court Reserve to view and manage
          court bookings.
        </p>
        <p>
          If you are a non-member and want to book a court, please contact the
          front desk at{" "}
          <a href={`mailto:${CLUB_EMAIL}`} className="text-esc-red hover:underline">
            {CLUB_EMAIL}
          </a>{" "}
          or{" "}
          <a href={`tel:${CLUB_PHONE_TEL}`} className="text-esc-red hover:underline">
            {CLUB_PHONE}
          </a>
          .
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={COURT_RESERVE_LOGIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-esc-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-esc-red-dark"
        >
          Member Login
        </a>
        <a
          href={CATCH_CORNER_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-esc-red px-5 py-2.5 text-sm font-semibold text-esc-red transition-colors hover:bg-esc-red hover:text-white"
        >
          Book a Court
        </a>
      </div>
    </div>
  );
}

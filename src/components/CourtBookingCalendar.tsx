import { CLUB_EMAIL, CLUB_PHONE, CLUB_PHONE_TEL } from "@/lib/constants";
import { PageHeader } from "@/components/PageContent";

export default function CourtBookingCalendar() {
  return (
    <div>
      <PageHeader title="Current Court Booking Calendar" />
      <div className="space-y-4 text-gray-700">
        <p>
          For privacy reasons, the booking interface with names is only available
          to members. Sometimes it&apos;s nice to get an idea if there&apos;s a
          court free on short notice, or for new members to get a sense of
          whether they&apos;ll be able to get a court at their preferred time a
          week ahead of time, so here&apos;s an anonymized view of the court
          bookings.
        </p>
        <p>
          Please note that this is not a booking interface. If you are a
          non-member and want to book a court, please contact the front desk at{" "}
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

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <iframe
          src="https://ts2.clubinterconnect.com/edmonton/home/calendarDayBlankView.do?id=59"
          title="Anonymized court booking calendar"
          className="h-[600px] w-full sm:h-[700px]"
        />
      </div>
    </div>
  );
}

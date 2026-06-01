export default function Footer() {
  return (
    <footer className="bg-esc-black text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide">Contact</h2>
          <address className="mt-4 space-y-2 not-italic text-white/80">
            <p>15330 111 Ave NW, Edmonton, AB T5M 4C8</p>
            <p>
              Phone:{" "}
              <a href="tel:+17803062395" className="hover:text-white">
                (780) 306-2395
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@edmontonsquashclub.ca"
                className="hover:text-white"
              >
                info@edmontonsquashclub.ca
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide">
            Operating Hours
          </h2>
          <div className="mt-4 space-y-2 text-white/80">
            <p>Mon–Friday: 4 PM – 10 PM</p>
            <p>Saturday/Sunday: 10 AM – 6 PM</p>
            <p className="pt-2 text-sm text-white/60">
              The Club is often staffed outside of regular hours — call at least
              1 day in advance for further information.
            </p>
            <p className="text-sm text-white/60">
              Members can access the facility from 5 AM – 12 AM, 365 days a year
              with their key fob.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        © Edmonton Squash Club 2015–2026
      </div>
    </footer>
  );
}

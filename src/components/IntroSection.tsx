import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="bg-white py-10 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-esc-black sm:text-3xl">
            Edmonton&apos;s Best Squash Destination
          </h2>
          <div className="mt-3 h-1 w-16 bg-esc-red" />
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            We are Edmonton&apos;s only dedicated squash facility, with a mission
            of growing the sport from ages 4 – 100.
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/intro.jpg"
            alt="Women playing squash at Edmonton Squash Club"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

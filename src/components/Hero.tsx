import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[320px] overflow-hidden sm:min-h-[480px]">
      <Image
        src="https://edmontonsquashclub.ca/wp-content/uploads/2017/12/GaultiervsGawad-header.jpg"
        alt="Squash match action at Edmonton Squash Club"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-24">
        <h1 className="max-w-3xl text-2xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
          Play Squash to Get Fit, Get Fit to Play Squash
        </h1>
        <p className="mt-3 max-w-xl text-base text-white/90 sm:mt-4 sm:text-xl">
          Growing the Edmonton squash community
        </p>
        <span className="mt-6 inline-block rounded-full bg-esc-red px-6 py-2.5 text-sm font-semibold text-white shadow-lg sm:mt-8 sm:px-8 sm:py-3 sm:text-base">
          Get Started: Create Your Free Account
        </span>
      </div>
    </section>
  );
}

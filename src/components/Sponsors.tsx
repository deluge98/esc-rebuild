import AntixSlideshow from "@/components/AntixSlideshow";

export default function Sponsors({ embedded = false }: { embedded?: boolean }) {
  const inner = (
    <>
      {!embedded && (
        <>
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-esc-black sm:text-3xl">
            Sponsors
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-esc-red" />
        </>
      )}

      <div className="mt-8">
        <AntixSlideshow variant="landscape" />
      </div>
    </>
  );

  if (embedded) {
    return <div>{inner}</div>;
  }

  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{inner}</div>
    </section>
  );
}

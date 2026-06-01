const features = [
  {
    title: "In House Leagues",
    description:
      "The ESC runs in-house team leagues, monthly box leagues & doubles ladders",
    icon: "🏆",
  },
  {
    title: "Learn to Play Programs",
    description:
      "Junior Development Programs, Learn-to-Play Programs, and continuous improvement programs for all levels, in private and group settings.",
    icon: "🎓",
  },
  {
    title: "Drop-ins",
    description:
      "Regular drop-in sessions for all members — singles play, doubles play, and women's only play.",
    icon: "🤝",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-esc-gray py-10 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold text-esc-black">
                <span className="text-2xl leading-none" aria-hidden="true">
                  {feature.icon}
                </span>
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

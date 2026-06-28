import Link from "next/link";

type PageContentProps = {
  html: string;
  className?: string;
};

/** Rewrite internal WP links to local paths. */
function rewriteLinks(html: string): string {
  return html
    .replace(/https?:\/\/(?:www\.)?edmontonsquashclub\.ca/gi, "")
    .replace(/href="\/\/edmontonsquashclub\.ca/gi, 'href="');
}

export default function PageContent({ html, className = "" }: PageContentProps) {
  const content = rewriteLinks(html);

  return (
    <div
      className={`wp-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="mb-8 sm:mb-10">
      {backHref && (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-esc-red hover:text-esc-red-dark"
        >
          ← {backLabel ?? "Back"}
        </Link>
      )}
      <h1
        className="text-2xl font-bold uppercase tracking-wide text-esc-black sm:text-3xl lg:text-4xl"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="mt-3 h-1 w-16 bg-esc-red" />
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
      )}
    </header>
  );
}

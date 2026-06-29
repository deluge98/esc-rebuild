import { sanitizeMigratedHtml } from "@/lib/sanitize-content";

export type ProgramAccordionItem = {
  title: string;
  href?: string;
  contentHtml: string;
};

export type ProgramTab = {
  id: string;
  title: string;
  image?: { src: string; alt: string };
  items: ProgramAccordionItem[];
};

const PROGRAM_SECTIONS: { title: string; id: string }[] = [
  { title: "Junior Programs", id: "junior" },
  { title: "Adult Training Programs", id: "adult" },
  { title: "ESC Leagues", id: "leagues" },
  { title: "Drop In Squash", id: "drop-in" },
];

function rewriteLinks(html: string): string {
  return html
    .replace(/https?:\/\/(?:www\.)?edmontonsquashclub\.ca/gi, "")
    .replace(/href="\/\/edmontonsquashclub\.ca/gi, 'href="');
}

function stripLabelHtml(html: string): { title: string; href?: string } {
  const linkMatch = html.match(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
  if (linkMatch) {
    return {
      href: linkMatch[1],
      title: linkMatch[2].replace(/<[^>]+>/g, "").trim(),
    };
  }
  return { title: html.replace(/<[^>]+>/g, "").trim() };
}

function parseAccordionItems(sectionHtml: string): ProgramAccordionItem[] {
  const chunks = sectionHtml.split(/<div class="uabb-adv-accordion-item"/).slice(1);
  const items: ProgramAccordionItem[] = [];

  for (const chunk of chunks) {
    const labelMatch = chunk.match(
      /uabb-adv-accordion-button-label[^>]*>([\s\S]*?)<\/h4>/,
    );
    const contentMatch = chunk.match(
      /uabb-adv-accordion-content[^>]*>([\s\S]*?)<\/div>\s*<\/div>/,
    );
    if (!labelMatch || !contentMatch) continue;

    const { title, href } = stripLabelHtml(labelMatch[1]);
    if (!title) continue;

    items.push({
      title,
      href,
      contentHtml: rewriteLinks(sanitizeMigratedHtml(contentMatch[1].trim())),
    });
  }

  return items;
}

function parseSectionImage(sectionHtml: string): ProgramTab["image"] | undefined {
  const match = sectionHtml.match(
    /class="uabb-photo-img[^"]*"[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?/,
  );
  if (!match) return undefined;
  return { src: match[1], alt: match[2] ?? "" };
}

function extractSectionHtml(html: string, title: string, nextTitle?: string): string {
  const start = html.indexOf(`<h4>${title}</h4>`);
  if (start === -1) return "";

  const contentStart = start + `<h4>${title}</h4>`.length;
  const end = nextTitle
    ? html.indexOf(`<h4>${nextTitle}</h4>`, contentStart)
    : html.length;

  return html.slice(contentStart, end === -1 ? html.length : end);
}

/** Parse migrated Beaver Builder programs page HTML into tab + accordion data. */
export function parseProgramsContent(html: string): ProgramTab[] {
  return PROGRAM_SECTIONS.map((section, index) => {
    const next = PROGRAM_SECTIONS[index + 1]?.title;
    const sectionHtml = extractSectionHtml(html, section.title, next);

    return {
      id: section.id,
      title: section.title,
      image: parseSectionImage(sectionHtml),
      items: parseAccordionItems(sectionHtml),
    };
  });
}

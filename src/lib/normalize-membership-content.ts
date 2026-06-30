/** Turn migrated `-item<br />` benefit lines into a proper list. */
export function normalizeMembershipContent(html: string): string {
  return html.replace(
    /(<h2>What club benefits[^<]*<\/h2>)\s*([\s\S]*?)(?=<h2>|$)/gi,
    (_match, heading: string, body: string) => {
      const items = [...body.matchAll(/-([^<\n]+)/g)].map((m) => m[1].trim());
      if (items.length === 0) return heading + body;

      const list = items.map((item) => `<li>${item}</li>`).join("\n");
      return `${heading}\n<ul class="membership-benefits">\n${list}\n</ul>`;
    },
  );
}

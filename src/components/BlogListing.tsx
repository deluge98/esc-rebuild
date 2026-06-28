import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { PageHeader } from "@/components/PageContent";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogListing() {
  const posts = getAllPosts();

  return (
    <div>
      <PageHeader
        title="Blog"
        subtitle="News, events, and updates from the Edmonton Squash Club."
      />

      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="py-6 first:pt-0">
              <time
                dateTime={post.date}
                className="text-sm font-medium text-gray-500"
              >
                {formatDate(post.date)}
              </time>
              <h2 className="mt-1 text-lg font-bold sm:text-xl">
                <Link
                  href={`/${post.slug}/`}
                  className="text-esc-black hover:text-esc-red"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </h2>
              {post.excerpt && (
                <p className="mt-2 line-clamp-2 text-gray-600">{post.excerpt}</p>
              )}
              <Link
                href={`/${post.slug}/`}
                className="mt-2 inline-block text-sm font-semibold text-esc-red hover:text-esc-red-dark"
              >
                Read more →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

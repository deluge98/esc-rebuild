import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Keep preview deployments off search engines; canonical URLs use edmontonsquashclub.ca. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.endsWith(".vercel.app")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

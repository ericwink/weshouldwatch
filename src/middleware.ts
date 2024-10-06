import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./lib/database.types";

export const config = {
  matcher: "/mygroups/:path*",
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const { data: session } = await supabase.auth.getSession();

  if (!session.session)
    return NextResponse.redirect(new URL("/login", req.url));

  return res;
}

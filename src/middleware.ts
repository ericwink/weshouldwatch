import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./lib/database.types";

function getGroupId(url: string): string | null {
  const regex = /mygroups\/([^/]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const config = {
  matcher: '/mygroups/:path*',
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return NextResponse.redirect(new URL('/login', req.url));
    const groupID = getGroupId(req.url)

    let { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .single();

  if (!user?.is_subscribed) {
    if (
      user?.primary_created !== groupID &&
      user?.primary_joined !== groupID
    ){
      return NextResponse.redirect(new URL('/accessDenied', req.url));
    }
  }

  return res;
}

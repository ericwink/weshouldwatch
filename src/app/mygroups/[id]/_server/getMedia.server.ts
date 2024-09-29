import "server-only";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";

interface Args {
  groupId: string;
  searchParams: { [key: string]: string | string[] | undefined };
  mediaType: "movie" | "tv";
}

export const getMedia = async ({ groupId, searchParams, mediaType }: Args) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const watched = searchParams?.watched === "true";


  let query = supabase
    .from("group_media")
    .select(`*,media(*), user_public_profile ( * )`)
    .eq("group_id", `${groupId}`)
    .eq("media.media_type", mediaType);

  if (searchParams?.watched) query.eq("watched", watched);

  return await query;
};

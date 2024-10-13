import "server-only";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";

interface Args {
  groupId: string;
  watched: boolean | undefined;
  mediaType: "movie" | "tv";
}

export const getMedia = async ({ groupId, watched, mediaType }: Args) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  let query = supabase
    .from("group_media")
    .select(`*,media(*), user_public_profile ( * )`)
    .eq("group_id", groupId)
    .eq("media.media_type", mediaType);

  if (watched !== undefined) query.eq("watched", watched);

  const { data, error } = await query;

  if (error) {
    console.log("error in getMedia", error);
    throw new Error("There was an error getting your media. Please try again");
  }

  return data;
};

type MediaArray = Awaited<ReturnType<typeof getMedia>>;
export type MediaData = MediaArray[number];

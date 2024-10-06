import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import GroupMediaCard from "./GroupMediaCard";

interface Props {
  groupId: string;
  mediaType: "movie" | "tv";
  watched: boolean | undefined;
}

const GroupMediaReturn = async ({ groupId, watched, mediaType }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  let query = supabase
    .from("group_media")
    .select(
      `id, media (title, poster_path), user_public_profile ( profile_pic )`
    )
    .eq("group_id", groupId)
    .eq("media.media_type", mediaType);

  if (watched) query.eq("watched", watched);

  const media = await query;

  if (media.error)
    throw new Error(`There was an error getting your media. Please try again`);

  return (
    <>
      {media.data.map((m) => (
        <GroupMediaCard
          media={m.media}
          user={m.user_public_profile}
          key={m.id}
          groupMediaId={m.id}
        />
      ))}
    </>
  );
};

export default GroupMediaReturn;

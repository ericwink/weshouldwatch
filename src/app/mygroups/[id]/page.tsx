import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import TabDisplay from "@/src/components/TabDisplay";
import CardGridFilter from "@/src/components/Cards/CardGridFilter";

interface Props {
  params: {
    id: string;
  };
}

interface GroupMedia {
  id: number;
  created_at: string;
  added_by: string;
  added_reason: string;
  watched: boolean;
  group_id: number;
  media_id: number;
  media: {
    created_at: string;
    tmdb_id: number;
    title: string;
    poster_path: string;
    genres: string[];
    media_type: string;
  };
  user_public_profile: {
    user_name: string;
    profile_pic: string;
  };
}

interface Condensed {
  entry_id: number;
  media_id: number;
  watched: boolean;
  added_reason: string;
  added_by: { user_id: string; user_name: string; profile_pic: string };
  genres: string[];
  media_type: string;
  poster_path: string;
  title: string;
  enabled: boolean;
}

interface Sorted {
  movies: Condensed[];
  tv: Condensed[];
}

const manipulateData = (data: GroupMedia[] | null) => {
  const sorted: Sorted = { movies: [], tv: [] };
  if (data === null) return sorted;
  for (let entry of data) {
    let newEntry = {
      entry_id: entry.id,
      media_id: entry.media_id,
      watched: entry.watched,
      added_reason: entry.added_reason,
      added_by: entry.user_public_profile ? { user_id: entry.added_by, ...entry.user_public_profile } : { user_id: "not provided", user_name: "not provided", profile_pic: "not provided" },
      genres: entry.media!.genres,
      media_type: entry.media!.media_type,
      poster_path: entry.media!.poster_path,
      title: entry.media!.title,
      enabled: true,
    };
    if (newEntry.media_type === "movie") {
      sorted.movies.push(newEntry);
    } else {
      sorted.tv.push(newEntry);
    }
  }
  return sorted;
};

const groupPageById = async ({ params: { id } }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const fetchMediaCollection = async (id: number) => {
    let { data: group_media, error } = await supabase
      .from("group_media")
      .select(
        `
      *,
      media (
        *
      ) , user_public_profile ( user_name, profile_pic )
    `
      )
      .eq("group_id", id);
    return group_media as GroupMedia[];
  };

  const data = await fetchMediaCollection(parseInt(id));
  const sortedData = manipulateData(data);
  // console.log(JSON.stringify(sortedData, null, 2));

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");

  return (
    <main>
      <TabDisplay tabNames={["Group Info", "Movies", "TV Shows"]}>
        <h1>This is where the group info will be</h1>
        <CardGridFilter
          mediaData={sortedData.movies}
          groupId={parseInt(id)}
        />
        <CardGridFilter
          mediaData={sortedData.tv}
          groupId={parseInt(id)}
        />
      </TabDisplay>
    </main>
  );
};

export default groupPageById;

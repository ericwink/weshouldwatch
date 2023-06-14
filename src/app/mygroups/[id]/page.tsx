import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { cookies } from "next/headers";

import TabDisplay from "@/src/components/TabDisplay";
import CardGridFilter from "@/src/components/CardGridFilter";

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
  watched: false;
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
  users: {
    email: string;
  };
}

interface Condensed {
  media_id: number;
  watched: boolean;
  added_reason: string;
  added_by: string;
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

const supabase = createServerComponentClient<Database>({ cookies });
const fetchMediaCollection = async (id: number) => {
  let { data: group_media, error } = await supabase
    .from("group_media")
    .select(
      `
    *,
    media (
      *
    ), users ( * )
  `
    )
    .eq("group_id", id);

  return group_media;
};

const manipulateData = (data: GroupMedia[] | null) => {
  const sorted: Sorted = { movies: [], tv: [] };
  if (data === null) return sorted;
  for (let entry of data) {
    let newEntry = {
      media_id: entry.media_id,
      watched: entry.watched,
      added_reason: entry.added_reason,
      added_by: entry.users ? entry.users.email : "not provided",
      genres: entry.media.genres,
      media_type: entry.media.media_type,
      poster_path: entry.media.poster_path,
      title: entry.media.title,
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
  const data = await fetchMediaCollection(parseInt(id));
  const sortedData = manipulateData(data);
  // console.log(JSON.stringify(sortedData, null, 2));

  return (
    <main>
      <TabDisplay tabNames={["Group Info", "Movies", "TV Shows"]}>
        <h1>This is where the group info will be</h1>
        <CardGridFilter mediaData={sortedData.movies} />
        <CardGridFilter mediaData={sortedData.tv} />
      </TabDisplay>
    </main>
  );
};

export default groupPageById;

[
  {
    id: 17,
    created_at: "2023-06-12T19:57:19.596457+00:00",
    added_by: "a8ba9e52-2368-4b1d-969c-c539f1ca43f4",
    added_reason: "this is a client test",
    watched: false,
    group_id: 31,
    media_id: 569094,
    media: {
      created_at: "2023-06-10T22:27:44.929652+00:00",
      tmdb_id: 569094,
      title: "Spider-Man: Across the Spider-Verse",
      poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      genres: ["Action", "Adventure", "Animation", "Science Fiction"],
      media_type: "movie",
    },
  },
  {
    id: 21,
    created_at: "2023-06-13T20:17:35.263677+00:00",
    added_by: "a8ba9e52-2368-4b1d-969c-c539f1ca43f4",
    added_reason: "I love this movie!",
    watched: false,
    group_id: 31,
    media_id: 324857,
    media: {
      created_at: "2023-06-13T20:17:35.134431+00:00",
      tmdb_id: 324857,
      title: "Spider-Man: Into the Spider-Verse",
      poster_path: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
      genres: ["Action", "Adventure", "Animation", "Science Fiction"],
      media_type: "movie",
    },
  },
  {
    id: 22,
    created_at: "2023-06-13T20:17:53.871202+00:00",
    added_by: "a8ba9e52-2368-4b1d-969c-c539f1ca43f4",
    added_reason: "Looks like a cool show about boxing",
    watched: false,
    group_id: 31,
    media_id: 127529,
    media: {
      created_at: "2023-06-13T20:17:53.762957+00:00",
      tmdb_id: 127529,
      title: "Bloodhounds",
      poster_path: "/kxU1hhebWZGaz8gkMVi8zkZhzVt.jpg",
      genres: ["Action & Adventure", "Drama", "Crime"],
      media_type: "tv",
    },
  },
];

// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import TabDisplay from "@/src/components/TabDisplay";
import CardGridFilter from "@/src/components/Cards/CardGridFilter";
import GroupDetails from "@/src/components/GroupControl/AddMedia/GroupDetails";

import { reorganizeGroupMedia } from "@/src/lib/reorganizeGroupMedia";
import { CondensedMedia } from "@/src/lib/interface";

interface Props {
  params: {
    id: string;
  };
}

export interface MemberData {
  user_id: string;
  user_public_profile: {
    user_name: string;
    profile_pic: string;
  };
}

export interface GroupMedia {
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

export interface Sorted {
  movie: CondensedMedia[];
  tv: CondensedMedia[];
}

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
      .eq("group_id", id)
      .order("id", { ascending: false });
    return group_media as GroupMedia[];
  };

  let { data: members, error } = await supabase.from("user_group_join").select("user_id, user_public_profile(user_name, profile_pic)").eq("group_id", id);
  // console.log(members);

  const data = await fetchMediaCollection(parseInt(id));
  const sortedData = reorganizeGroupMedia(data);
  // console.log(JSON.stringify(sortedData, null, 2));

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");

  return (
    <main>
      <TabDisplay tabNames={["Movies", "TV Shows", "Group Info"]}>
        <CardGridFilter
          mediaData={sortedData.movie}
          groupId={parseInt(id)}
          mediaType="movie"
        />
        <CardGridFilter
          mediaData={sortedData.tv}
          groupId={parseInt(id)}
          mediaType="tv"
        />
        <GroupDetails
          groupId={parseInt(id)}
          members={members as MemberData[]}
        />
      </TabDisplay>
    </main>
  );
};

export default groupPageById;

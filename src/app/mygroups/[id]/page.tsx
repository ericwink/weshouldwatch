// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchMediaCollection } from "../_server/fetchMediaCollection";

import TabDisplay from "@/src/components/TabDisplay";
import CardGridFilter from "@/src/components/Cards/CardGridFilter";
import GroupDetails from "@/src/components/GroupControl/AddMedia/GroupDetails";

import { reorganizeGroupMedia } from "@/src/lib/reorganizeGroupMedia";
import { CondensedMedia } from "@/src/lib/interface";

import { type MemberData } from "@/src/types";
import { getUserData } from "../_server/getUserData";
import { getGroupMembers } from "../_server/getGroupMembers";

interface Props {
  params: {
    id: string;
  };
}

export interface Sorted {
  movie: CondensedMedia[];
  tv: CondensedMedia[];
}

const groupPageById = async ({ params: { id } }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");
  const { user, error: userFetchError } = await getUserData(supabase);
  if (!user) throw new Error("user not found");

  const isSubscribed = user.is_subscribed;
  const isPrimary = user.primary_created === id || user.primary_joined === id;
  const { members, error: membersError } = await getGroupMembers(id, supabase);

  if (membersError) throw new Error("Could not find members");

  const data = await fetchMediaCollection(id, supabase);
  const sortedData = reorganizeGroupMedia(data);

  if (!isSubscribed || !isPrimary)
    return (
      <h1>Either buy premium, or change this group to your primary group</h1>
    );
  return (
    <main>
      <TabDisplay tabNames={["Movies", "TV Shows", "Group Info"]}>
        <CardGridFilter
          mediaData={sortedData.movie}
          groupId={id}
          mediaType="movie"
        />
        <CardGridFilter mediaData={sortedData.tv} groupId={id} mediaType="tv" />
        <GroupDetails groupId={id} members={members as MemberData[]} />
      </TabDisplay>
    </main>
  );
};

export default groupPageById;

// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MakeGroup from "../../components/MakeGroup";
import GroupCard from "../../components/GroupCard";
import CardGrid from "../../components/CardGrid";
import { Database } from "@/lib/database.types";
import TabDisplay from "@/src/components/TabDisplay";
import InviteToAGroup from "@/src/components/InviteToAGroup";

const supabase = createServerComponentClient<Database>({ cookies });

const fetchGroups = async () => {
  let { data: group, error } = await supabase.from("group").select("*");
  if (error) console.log(error);

  return group;
};

const groupsPage = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");

  const groups = await fetchGroups();

  if (groups?.length! < 1) return <h2>No Groups Yet!</h2>;

  return (
    <main>
      <TabDisplay tabNames={["My Groups", "Create A Group", "Invite To A Group"]}>
        <CardGrid>
          {groups?.map(group => (
            <GroupCard
              key={group.id}
              {...group}
            />
          ))}
        </CardGrid>
        <MakeGroup />
        <InviteToAGroup groups={groups} />
      </TabDisplay>
    </main>
  );
};

export default groupsPage;

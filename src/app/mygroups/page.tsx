// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MakeGroup from "../../components/MakeGroup";
import GroupCard from "../../components/GroupCard";
import CardGrid from "../../components/CardGrid";
import ModalChildren from "../../components/ModalChildren";
import { Database } from "@/src/lib/database.types";

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
    <>
      <ModalChildren
        button="Create Group"
        title="Create A New Group"
      >
        <MakeGroup />
      </ModalChildren>
      <CardGrid>
        {groups?.map(group => (
          <GroupCard
            key={group.id}
            {...group}
          />
        ))}
      </CardGrid>
    </>
  );
};

export default groupsPage;

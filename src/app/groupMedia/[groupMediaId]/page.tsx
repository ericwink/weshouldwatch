import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { Paper, Avatar } from "@mui/material";
import { redirect } from "next/navigation";
import { userIsGroupMember } from "../../mygroups/[id]/_server/userIsGroupMember.server";

interface Props {
  params: {
    groupMediaId: string;
  };
}

const GroupMediaIdPage = async ({ params }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("group_media")
    .select(`*,media(*), user_public_profile ( * )`)
    .eq("id", params.groupMediaId)
    .single();

  if (!data || error) throw new Error("There was an error finding this data");

  const isMember = await userIsGroupMember(data.group_id);
  if (!isMember) redirect("/accessDenied");

  return (
    <div>
      <p>Group Media Id: {params.groupMediaId}</p>
      <p>{JSON.stringify(data)}</p>
      <Paper></Paper>
    </div>
  );
};

export default GroupMediaIdPage;

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { Typography } from "@mui/material";
import InviteToAGroup from "./components/InviteToAGroup";
import MemberDisplay from "./components/MemberDisplay";

interface Props {
  params: {
    id: string;
  };
}

const GroupInfoPage = async ({ params }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  let { data, error } = await supabase
    .from("user_group_join")
    .select("user_id, user_public_profile(user_name, profile_pic)")
    .eq("group_id", params.id);

  if (!data || error)
    throw new Error("There was an error getting group data. Please try again");

  return (
    <div className="flex flex-col justify-center gap-3">
      <Typography variant="h4">Group Members:</Typography>
      {data.map((member) => (
        <MemberDisplay
          user_id={member.user_id}
          user_public_profile={member.user_public_profile}
          key={member.user_id}
        />
      ))}
      <InviteToAGroup groupId={params.id} />
    </div>
  );
};

export default GroupInfoPage;

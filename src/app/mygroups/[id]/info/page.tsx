import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { Typography, Avatar } from "@mui/material";
import InviteToAGroup from "@/src/components/GroupControl/InviteToAGroup";

interface Props {
  params: {
    id: string;
  };
}

interface MemberDisplayProps {
  user_id: string;
  user_public_profile: {
    user_name: string;
    profile_pic: string | null;
  } | null;
}

const MemberDisplay = (member: MemberDisplayProps) => {
  if (!member.user_public_profile)
    return <Typography>No profile found</Typography>;

  return (
    <div className="flex gap-2 items-center">
      <Avatar src={member.user_public_profile.profile_pic || ""} />
      <Typography>{member.user_public_profile.user_name}</Typography>
    </div>
  );
};

const GroupInfoPage = async ({ params }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");
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
        />
      ))}
      <InviteToAGroup groupId={params.id} />
    </div>
  );
};

export default GroupInfoPage;

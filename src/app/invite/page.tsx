import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import AcceptInvite from "@/src/components/AcceptInvite";
import { redirect } from "next/navigation";
import { Typography, Paper, Avatar } from "@mui/material";

interface Props {
  searchParams: { token: string };
}
// http://localhost:3000/invite?token=${body.record.id}

interface Invite {
  created_at: string;
  created_by: string;
  email: string;
  group_id: number;
  id: string;
  user_public_profile: {
    created_at: string | null;
    profile_pic: string | null;
    user_id: string;
    user_name: string;
  };
}

export default async function invitePage({ searchParams }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
    error: accountError,
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { token } = searchParams;
  let { data, error } = await supabase.from("invite_to_group").select("*, user_public_profile ( * )").eq("id", token).single();

  const invitation: Invite = data;

  if (!invitation) return <h1>{`No invitation found for your email address`}</h1>;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Paper sx={{ minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
        <Typography>You have been invited to a group by</Typography>
        <Typography variant="h6">{invitation.user_public_profile.user_name}</Typography>
        <Avatar
          src={invitation.user_public_profile.profile_pic ?? ""}
          alt={invitation.user_public_profile.user_name}
          sx={{ height: 100, width: 100 }}
        />
        <AcceptInvite
          invite={invitation as Invite}
          key={invitation.id}
        />
      </Paper>
    </div>
  );
}

import AcceptInvite from "@/src/components/AcceptInvite";
import { redirect } from "next/navigation";
import { Typography, Paper, Avatar } from "@mui/material";
import { getUserSession, getInvitation } from "@/src/lib";

interface Props {
  searchParams: { token: string };
}

interface Invite {
  created_at: string;
  created_by: string;
  email: string;
  group_id: string;
  id: string;
  user_public_profile: {
    created_at: string | null;
    profile_pic: string | null;
    user_id: string;
    user_name: string;
  };
}

export default async function invitePage({ searchParams }: Props) {
  const { data: session, error: sessionError } = await getUserSession();

  if (!session) redirect("/login");

  const { token } = searchParams;
  const { data, error } = await getInvitation({ token });

  const invitation = data as Invite;

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
          invite={invitation}
          key={invitation.id}
        />
      </Paper>
    </div>
  );
}

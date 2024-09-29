import { Typography, Avatar } from "@mui/material";

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

export default MemberDisplay;

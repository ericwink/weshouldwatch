"use client";

import { Avatar } from "@mui/material";
import { useUserAccount } from "@/src/lib/tanstackHooks";

interface Props {
  height?: number;
  width?: number;
}

const UserAvatar = ({ height = 40, width = 40 }: Props) => {
  const { data: user } = useUserAccount();

  return (
    <Avatar
      sx={{ height: height, width: width }}
      src={user?.user_public_profile.profile_pic ?? undefined}
    />
  );
};

export default UserAvatar;

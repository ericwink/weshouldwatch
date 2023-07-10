"use client";

import { Avatar } from "@mui/material";
import { useUserStore } from "@/src/lib/store";

interface Props {
  height?: number;
  width?: number;
}

const UserAvatar = ({ height = 40, width = 40 }: Props) => {
  const user = useUserStore(state => state.user);

  return (
    <Avatar
      sx={{ height: height, width: width }}
      src={user?.user_public_profile.profile_pic ?? undefined}
    />
  );
};

export default UserAvatar;

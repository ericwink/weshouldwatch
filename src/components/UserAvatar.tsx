"use client";

import { Avatar } from "@mui/material";
import { useUser } from "../context/user";
import { User } from "../lib/interface";

interface Props {
  height?: number;
  width?: number;
}

const UserAvatar = ({ height = 40, width = 40 }: Props) => {
  const { user }: { user: User } = useUser();

  return (
    <Avatar
      sx={{ height: height, width: width }}
      src={user.user_public_profile.profile_pic}
    ></Avatar>
  );
};

export default UserAvatar;

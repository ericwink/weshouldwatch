"use client";

import { Avatar } from "@mui/material";
import { useUser } from "../context/user";
import { User } from "../lib/interface";

interface Props {
  height?: number;
  width?: number;
  userImage?: string | null;
}

const UserAvatar = ({ height = 40, width = 40, userImage = null }: Props) => {
  const { user }: { user: User } = useUser();

  const image = userImage ?? user.user_public_profile.profile_pic;

  return (
    <Avatar
      sx={{ height: height, width: width }}
      src={image}
    ></Avatar>
  );
};

export default UserAvatar;

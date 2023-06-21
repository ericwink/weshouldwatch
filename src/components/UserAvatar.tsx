"use client";

import { Avatar } from "@mui/material";
import { useUser } from "../context/user";

interface Props {
  height?: number;
  width?: number;
}

const UserAvatar = ({ height = 40, width = 40 }: Props) => {
  const { user } = useUser();
  const image = user.user_public_profile.profile_pic ?? user?.user_metadata.picture;

  // console.log(user.user_public_profile.user_name);

  return (
    <Avatar
      sx={{ height: height, width: width }}
      src={image}
    ></Avatar>
  );
};

export default UserAvatar;

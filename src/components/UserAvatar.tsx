"use client";

import { Avatar } from "@mui/material";
import { useUser } from "../context/user";

const UserAvatar = () => {
  const { user } = useUser();
  const image = user.user_public_profile.profile_pic ?? user?.user_metadata.picture;

  // console.log(user.user_public_profile.user_name);

  return <Avatar src={image}></Avatar>;
};

export default UserAvatar;

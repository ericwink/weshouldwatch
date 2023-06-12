"use client";

import { Avatar } from "@mui/material";
import { useUser } from "../app/context/user";

const UserAvatar = () => {
  const { user } = useUser();
  const image = user?.user_metadata.picture;

  return <Avatar src={image}></Avatar>;
};

export default UserAvatar;

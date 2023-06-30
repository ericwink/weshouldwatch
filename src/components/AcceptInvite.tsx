"use client";

import { Typography, Paper, Box, Button } from "@mui/material";
import UserAvatar from "./Account/UserAvatar";
import { acceptInvite } from "../lib/serverActions";
import { useState } from "react";

interface Props {
  invite: {
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
  };
}

export default function AcceptInvite({ invite }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const result = await acceptInvite(invite.group_id);
    if (result.error) {
      setError(true);
      setMessage(result.message);
    } else {
      setAccepted(true);
    }
    setIsLoading(false);
  };

  const pendingAccept = (
    <>
      <Typography>Do you want to join?</Typography>
      <Button
        disabled={isLoading}
        onClick={handleClick}
      >
        Join Group!
      </Button>
    </>
  );

  const confirmation = (
    <>
      <Typography>Invite Accpted</Typography>
      <Typography>Go to MY GROUPS to see your new group</Typography>
    </>
  );

  return (
    <Paper sx={{ minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
      <Typography>You have been invited to a group by</Typography>
      <Typography variant="h6">{invite.user_public_profile.user_name}</Typography>
      <UserAvatar
        height={100}
        width={100}
        userImage={invite.user_public_profile.profile_pic}
      />
      {accepted ? confirmation : pendingAccept}
    </Paper>
  );
}

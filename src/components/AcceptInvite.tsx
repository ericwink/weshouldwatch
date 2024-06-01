"use client";

import { Typography } from "@mui/material";
import Link from "next/link";
import SpinnerButton from "./SpinnerButton";
import { useAcceptInvite } from "../hooks";

export interface Invite {
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

interface Props {
  invite: Invite;
}

export default function AcceptInvite({ invite }: Props) {
  const { accepted, handleAcceptInvite, isLoading } = useAcceptInvite({ invite });

  if (!accepted)
    return (
      <>
        <Typography>Do you want to join?</Typography>
        <SpinnerButton
          onClick={() => handleAcceptInvite()}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Join Group!
        </SpinnerButton>
      </>
    );

  return (
    <>
      <Typography>Invite Accpted</Typography>
      <Typography>
        Go to <Link href={"/mygroups"}>MY GROUPS</Link> to see your new group
      </Typography>
    </>
  );
}

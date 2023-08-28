"use client";

import { Typography } from "@mui/material";
import { acceptInvite } from "../lib/serverActions";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";
import SpinnerButton from "./SpinnerButton";

interface Props {
  invite: {
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
  };
}

export default function AcceptInvite({ invite }: Props) {
  const [accepted, setAccepted] = useState(false);

  const { mutate: handleAcceptInvite, isLoading } = useMutation({
    mutationFn: async () => {
      const result = await acceptInvite(invite.group_id);
      if (result.error) throw new Error(result.message);
    },
    onError: (error: any) => toast.error(`${error.message}`, { theme: "colored" }),
    onSuccess: () => {
      setAccepted(true);
      toast.success(`Success! You're in!`, { theme: "colored" });
    },
  });

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

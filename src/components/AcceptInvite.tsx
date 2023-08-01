"use client";

import { Typography, Button, CircularProgress } from "@mui/material";
import { acceptInvite } from "../lib/serverActions";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";

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
        <Button
          disabled={isLoading}
          onClick={() => handleAcceptInvite()}
        >
          Join Group!
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px" }}
            />
          )}
        </Button>
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

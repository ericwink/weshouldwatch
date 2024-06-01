import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { acceptInvite } from "../lib/serverActions";
import { toast } from "react-toastify";
import type { Invite } from "../components/AcceptInvite";

interface Args {
  invite: Invite;
}

const useAcceptInvite = (args: Args) => {
  const { invite } = args;

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

  return { handleAcceptInvite, isLoading, accepted };
};

export default useAcceptInvite;

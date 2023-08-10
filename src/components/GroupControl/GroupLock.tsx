"use client";

import { IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CircularProgress } from "@mui/material";
import { useUserStore } from "@/src/lib/store";
import { updatePrimary } from "@/src/lib/serverActions";
import { toast } from "react-toastify";

interface Props {
  groupId: string;
  created_by: string;
}

const GroupLock = ({ groupId, created_by }: Props) => {
  const supabase = createClientComponentClient();
  const user = useUserStore(state => state.user);
  const queryClient = useQueryClient();

  const groupType = created_by === user?.id ? "primary_created" : "primary_joined";

  const { data: primaryGroups, isLoading } = useQuery({
    queryKey: ["primaryGroups"],
    queryFn: async () => {
      let { data: users, error } = await supabase.from("users").select("primary_created, primary_joined").single();
      return users;
    },
  });

  const { mutate: updateGroup } = useMutation({
    mutationFn: async () => {
      const response = await updatePrimary(groupType, groupId);
      if (response.error) throw new Error(response.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["primaryGroups"]);
      toast.success("Group updated successfully", { theme: "colored" });
    },
    onError: (error: any) => toast.error(error.message, { theme: "colored" }),
  });

  const unlocked = (
    <IconButton
      sx={{ mt: -2 }}
      disabled
    >
      <LockOpenIcon />
    </IconButton>
  );

  const locked = (
    <IconButton
      onClick={() => updateGroup()}
      sx={{ mt: -2 }}
    >
      <LockIcon />
    </IconButton>
  );

  if (isLoading)
    return (
      <CircularProgress
        size={25}
        sx={{ mt: -2 }}
      />
    );
  return <div>{groupId === primaryGroups?.primary_created || groupId === primaryGroups?.primary_joined ? unlocked : locked}</div>;
};

export default GroupLock;

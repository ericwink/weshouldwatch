"use client";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUserStore } from "@/src/lib/store";
import { updatePrimary } from "@/src/lib/serverActions";
import { toast } from "react-toastify";
import { useState } from "react";
import SpinnerButton from "../../../components/SpinnerButton";

interface Props {
  groupId: string;
  created_by: string;
}

const GroupLock = ({ groupId, created_by }: Props) => {
  const supabase = createClientComponentClient();
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const groupType =
    created_by === user?.id ? "primary_created" : "primary_joined";
  const groupTypeModal = created_by === user?.id ? "Created" : "Joined";

  const { data: primaryGroups, isLoading } = useQuery({
    queryKey: ["primaryGroups"],
    queryFn: async () => {
      let { data: users, error } = await supabase
        .from("users")
        .select("primary_created, primary_joined")
        .single();
      return users;
    },
  });

  const { mutate: updateGroup, isLoading: updateLoading } = useMutation({
    mutationFn: async () => {
      const response = await updatePrimary(groupType, groupId);
      if (response.error) throw new Error(response.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["primaryGroups"]);
      toast.success("Group updated successfully", { theme: "colored" });
      setShowModal(false);
    },
    onError: (error: any) => toast.error(error.message, { theme: "colored" }),
  });

  const unlocked = (
    <IconButton sx={{ mt: -2 }} disabled>
      <LockOpenIcon />
    </IconButton>
  );

  const locked = (
    <IconButton onClick={() => setShowModal(true)} sx={{ mt: -2 }}>
      <LockIcon />
    </IconButton>
  );

  if (isLoading) return <CircularProgress size={25} sx={{ mt: -2 }} />;
  return (
    <div>
      {groupId === primaryGroups?.primary_created ||
      groupId === primaryGroups?.primary_joined
        ? unlocked
        : locked}

      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Unlock ${groupTypeModal} Group`}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <DialogContentText id="alert-dialog-description">{`Since you are no longer a Premium member, you are only allowed one Created Group and one Joined Group. Since you belong to numerous groups, once every 30 days you are permitted to update which group you would like to access. Would you like to proceed?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <SpinnerButton
            onClick={() => updateGroup()}
            isLoading={updateLoading}
          >
            {`Unlock ${groupTypeModal} Group`}
          </SpinnerButton>

          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GroupLock;

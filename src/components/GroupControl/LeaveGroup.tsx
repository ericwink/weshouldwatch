"use client";

import { Button, Typography } from "@mui/material";
import ConfirmDelete from "../ConfirmDelete";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { leaveGroup } from "@/src/lib/serverActions";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  group_name: string | null;
  id: string;
}

const LeaveGroup = ({ id, group_name }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: leaveTheGroup, isLoading } = useMutation({
    mutationFn: async () => {
      const result = await leaveGroup(id);
      if (result.error) throw new Error(result.message);
    },
    onSuccess: () => {
      toast.success("You've left the group!", { theme: "colored" });
      setShowDeleteModal(false);
    },
    onError: (error: any) => {
      toast.error(error.message, { theme: "colored" });
    },
  });

  return (
    <div>
      <Button size="small" color="error" sx={{ display: "flex", gap: 1 }}>
        <Typography onClick={() => setShowDeleteModal(true)}>
          Delete Group
        </Typography>
        <LogoutIcon />
      </Button>

      <ConfirmDelete
        confirmDelete={() => leaveTheGroup()}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        warningMessage="This action will remove you from the group! Are you sure you want to proceed?"
        extraSecure={true}
        extraSecureCheck={group_name as string}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LeaveGroup;

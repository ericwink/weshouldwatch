"use client";

import { IconButton } from "@mui/material";
import ConfirmDelete from "../ConfirmDelete";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteGroup } from "@/src/lib/serverActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  group_name: string | null;
  id: number;
}

const DeleteGroup = ({ id, group_name }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: deleteThisGroup } = useMutation({
    mutationFn: async () => {
      const result = await deleteGroup(id);
      if (result.error) throw new Error(result.message);
    },
    onSuccess: () => {
      toast.success("Group deleted successfully", { theme: "colored" });
    },
    onError: (error: any) => {
      toast.error(error.message, { theme: "colored" });
    },
  });

  return (
    <div>
      <IconButton
        color="error"
        onClick={() => setShowDeleteModal(true)}
      >
        <DeleteForeverIcon />
      </IconButton>
      <ConfirmDelete
        confirmDelete={() => deleteThisGroup()}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        warningMessage="This action will delete ALL group data and cannot be undone."
        extraSecure={true}
        extraSecureCheck={group_name as string}
      />
    </div>
  );
};

export default DeleteGroup;

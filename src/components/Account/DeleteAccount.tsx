"use client";

import { Button, Box } from "@mui/material";
import ConfirmDelete from "../ConfirmDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { UserAccount } from "@/src/lib/interface";
import { useDeleteAccount } from "@/src/hooks";

interface Props {
  user: UserAccount;
}

const DeleteAccount = ({ user }: Props) => {
  const { deleteAccount, isLoading, setShowDeleteModal, showDeleteModal } = useDeleteAccount({ userAccount: user });

  return (
    <Box width="100%">
      <Button
        fullWidth
        variant="outlined"
        color="error"
        sx={{ display: "flex", gap: 1 }}
        onClick={() => setShowDeleteModal(true)}
      >
        Delete Account
        <DeleteForeverIcon />
      </Button>
      <ConfirmDelete
        confirmDelete={() => deleteAccount()}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        warningMessage="This action will delete your account and all associated data and cannot be undone."
        extraSecure={true}
        extraSecureCheck={user.email as string}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default DeleteAccount;

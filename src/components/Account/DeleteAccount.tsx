"use client";

import { Button, Box } from "@mui/material";
import ConfirmDelete from "../ConfirmDelete";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { UserAccount } from "@/src/lib/interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/lib/store";

interface Props {
  user: UserAccount;
}

const DeleteAccount = ({ user }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);

  const { mutate: deleteAccount, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/user/deleteAccount", { userId: user.id, stripeId: user.stripe_customer });
    },
    onSuccess: () => {
      toast.success("Account deleted successfully", { theme: "colored" });
      setShowDeleteModal(false);
      setUser(null);
      router.push("/");
    },
    onError: (error: any) => {
      const message = error.response.data || "There was an error, please try again";
      toast.error(message, { theme: "colored" });
    },
  });

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

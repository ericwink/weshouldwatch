"use client";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SpinnerButton from "../SpinnerButton";
import axios from "axios";
import { z } from "zod";

export default function InviteToAGroup({ groupId }: { groupId: string }) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };

  const userEmail = z
    .string()
    .email({ message: "Please enter a valid email address" });

  const { mutate: sendInvite, isLoading } = useMutation({
    mutationFn: async () => {
      userEmail.parse(email);
      await axios.post("/api/group/inviteUser", {
        group_id: groupId,
        email: email,
      });
    },
    onSuccess: () => {
      toast.success("Invitation sent successfully!", { theme: "colored" });
      handleClose();
    },
    onError: (error: any) => {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message, { theme: "colored" });
      } else {
        toast.error(error.response?.data || error.message, {
          theme: "colored",
        });
      }
    },
  });

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{ display: "flex", gap: 1 }}>
        <AddCircleOutlineIcon />
        Invite A New Group Member
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send an invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter an email address and hit submit!
          </DialogContentText>
          <TextField
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            disabled={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <SpinnerButton
            onClick={() => sendInvite()}
            disabled={isLoading || !email}
            isLoading={isLoading}
          >
            Submit
          </SpinnerButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

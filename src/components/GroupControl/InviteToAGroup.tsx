"use client";

import { TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

export default function InviteToAGroup({ groupId }: { groupId: number }) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const { mutate: sendInvite, isLoading } = useMutation({
    mutationFn: async () => {
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail) throw new Error("Please enter a valid email address");
      const result = await axios.post("/api/group/inviteUser", { group_id: groupId, email: email });
      console.log(result);
    },
    onSuccess: () => {
      toast.success("Invitation sent successfully!", { theme: "colored" });
      handleClose();
    },
    onError: (error: any) => toast.error(error.response?.data || error.message, { theme: "colored" }),
  });

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{ display: "flex", gap: 1 }}
      >
        <AddCircleOutlineIcon />
        Invite A New Group Member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Send an invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter an email address and hit submit!</DialogContentText>
          <TextField
            label="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => sendInvite()}
            disabled={isLoading || !email}
            sx={{ position: "relative" }}
          >
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px" }}
              />
            )}
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

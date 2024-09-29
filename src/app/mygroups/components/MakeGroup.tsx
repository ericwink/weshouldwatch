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
import { createGroup } from "../../../lib/serverActions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SpinnerButton from "../../../components/SpinnerButton";

const MakeGroup = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const { mutate: handleCreate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await createGroup(name);
      if (response.error) throw new Error(response.message);
    },
    onSuccess: () => {
      toast.success("Group created successfully!", { theme: "colored" });
      handleClose();
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message, { theme: "colored" });
    },
  });

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{ display: "flex", gap: 1 }}>
        <AddCircleOutlineIcon />
        Create A Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your group and hit submit!
          </DialogContentText>
          <TextField
            label="Group name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <SpinnerButton
            onClick={() => handleCreate()}
            disabled={isLoading || !name}
            isLoading={isLoading}
          >
            Submit
          </SpinnerButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MakeGroup;

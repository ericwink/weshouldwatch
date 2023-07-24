import { ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  confirmDelete: () => void;
  warningMessage: string;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmDelete({ showDeleteModal, setShowDeleteModal, warningMessage, confirmDelete }: Props) {
  const handleClose = () => {
    setShowDeleteModal(false);
    confirmDelete();
  };

  return (
    <Dialog
      open={showDeleteModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{`${warningMessage} Are you sure you want to delete?`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Delete</Button>
        <Button
          onClick={handleClose}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

interface Props {
  confirmDelete: () => void;
  warningMessage: string;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  extraSecure?: boolean;
  extraSecureCheck?: string;
}

export default function ConfirmDelete({ showDeleteModal, setShowDeleteModal, warningMessage, confirmDelete, extraSecure = false, extraSecureCheck }: Props) {
  const [input, setInput] = useState("");

  const handleClose = () => {
    setInput("");
    setShowDeleteModal(false);
  };

  const handleConfirm = () => {
    handleClose();
    confirmDelete();
  };

  return (
    <Dialog
      open={showDeleteModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"WARNING!"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <DialogContentText id="alert-dialog-description">{`${warningMessage}`}</DialogContentText>
        {extraSecure && (
          <>
            <DialogContentText>{`Enter the name of the group "${extraSecureCheck}" to proceed.`}</DialogContentText>
            <TextField
              onChange={e => setInput(e.target.value)}
              value={input}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirm}
          disabled={extraSecure && input !== extraSecureCheck}
        >
          Delete
        </Button>
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

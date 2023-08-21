import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, CircularProgress } from "@mui/material";

interface Props {
  confirmDelete: () => void;
  warningMessage: string;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  extraSecure?: boolean;
  extraSecureCheck?: string;
  isLoading: boolean;
}

export default function ConfirmDelete({ showDeleteModal, setShowDeleteModal, warningMessage, confirmDelete, extraSecure = false, extraSecureCheck, isLoading }: Props) {
  const [input, setInput] = useState("");

  const handleClose = () => {
    setInput("");
    setShowDeleteModal(false);
  };

  const handleConfirm = () => {
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
            <DialogContentText>{`Enter "${extraSecureCheck}" below to proceed.`}</DialogContentText>
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
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px" }}
            />
          )}
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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import SpinnerButton from "../../../components/SpinnerButton";
import { useState } from "react";

interface Props {
  confirmDelete: () => void;
  warningMessage: string;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  extraSecure?: boolean;
  extraSecureCheck?: string;
  isLoading: boolean;
}

export default function ConfirmDelete({
  showDeleteModal,
  setShowDeleteModal,
  warningMessage,
  confirmDelete,
  extraSecure = false,
  extraSecureCheck,
  isLoading,
}: Props) {
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
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <SpinnerButton
          onClick={() => handleConfirm()}
          disabled={extraSecure && input !== extraSecureCheck}
          isLoading={isLoading}
        >
          Delete
        </SpinnerButton>

        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

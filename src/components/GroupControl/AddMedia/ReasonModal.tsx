import * as React from "react";
import { TextField, Button, Modal, Typography, Box } from "@mui/material";
import SpinnerButton from "../../SpinnerButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
  reason: string;
  isLoading?: boolean;
}

export default function ReasonModal({ open, setOpen, reason, setReason, handleSubmit, isLoading = false }: Props) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          display="flex"
          flexDirection="column"
          gap={1}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            Why are you adding this?
          </Typography>
          <TextField
            placeholder="I want to watch this because...."
            onChange={e => setReason(e.target.value)}
            helperText={"Reason is optional"}
          />
          <SpinnerButton
            onClick={() => handleSubmit()}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Submit
          </SpinnerButton>
        </Box>
      </Modal>
    </div>
  );
}

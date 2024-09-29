import * as React from "react";
import { TextField, Modal, Typography, Box } from "@mui/material";
import SpinnerButton from "../../../../components/SpinnerButton";
import { useState } from "react";

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
  isLoading?: boolean;
  toggleModal: () => void;
  prevReason: string;
}

export default function ReasonModal({
  open,
  isLoading = false,
  toggleModal,
  prevReason,
}: Props) {
  const [reason, setReason] = useState(prevReason);

  const updateReason = () => {
    console.log("new reason:", reason);
    toggleModal();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display="flex" flexDirection="column" gap={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Why are you adding this?
          </Typography>
          <TextField
            placeholder="I want to watch this because...."
            onChange={(e) => setReason(e.target.value)}
            helperText={"Reason is optional"}
            value={reason}
            disabled={isLoading}
          />
          <SpinnerButton
            onClick={() => updateReason()}
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

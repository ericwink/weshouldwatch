import * as React from "react";
import { TextField, Modal, Typography, Box } from "@mui/material";
import SpinnerButton from "../../../../../components/SpinnerButton";
import { useState } from "react";
import { updateReason } from "./updateReason.server";
import { toast } from "react-toastify";
import { useTransition } from "react";
import type { MediaData } from "../../_server/getMedia.server";

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
  toggleModal: () => void;
  mediaData: MediaData;
}
const UpdateReasonModal = ({ open, toggleModal, mediaData }: Props) => {
  const [reason, setReason] = useState("");
  const [isPending, startTransition] = useTransition();

  const closeModal = () => {
    setReason("");
    toggleModal();
  };

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const result = await updateReason({
          newReason: reason,
          rowId: mediaData.id,
        });

        if (result?.error) {
          if (Array.isArray(result.error)) {
            result.error.forEach((e) => {
              toast.error(e.message);
            });
          } else {
            toast.error(result.error);
          }
        }
        toast.success("Reason updated!");
        closeModal();
      } catch (error) {
        toast.error("Something went wrong. Please try again");
      }
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display="flex" flexDirection="column" gap={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Why is this on your list?
          </Typography>
          <TextField
            placeholder="I want to watch this because...."
            onChange={(e) => setReason(e.target.value)}
            helperText={"Reason is optional"}
            value={reason}
            disabled={isPending}
          />
          <SpinnerButton
            onClick={() => handleSubmit()}
            isLoading={isPending}
            disabled={isPending}
          >
            Submit
          </SpinnerButton>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateReasonModal;

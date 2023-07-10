"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LogInSignUp from "@/src/components/LogInSignUp";
import { useRouter } from "next/navigation";
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
  display: "flex",
  justifyContent: "center",
};

const SignupModalIntercept = () => {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LogInSignUp type="signup" />
        </Box>
      </Modal>
    </div>
  );
};

export default SignupModalIntercept;

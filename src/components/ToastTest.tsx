"use client";

import { toast } from "react-toastify";
import { Button } from "@mui/material";

const notify = () => toast.info("Wow so easy !", { theme: "colored" });

const ToastTest = () => {
  return (
    <Button
      variant="contained"
      onClick={notify}
    >
      Test Toast
    </Button>
  );
};

export default ToastTest;

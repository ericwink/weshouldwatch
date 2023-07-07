"use client";
import { toast } from "react-toastify";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton } from "@mui/material";

const notify = () => toast.info("Subscribe to access this feature!", { theme: "colored" });

const FakeChat = () => {
  return (
    <IconButton onClick={notify}>
      <ChatIcon />
    </IconButton>
  );
};

export default FakeChat;

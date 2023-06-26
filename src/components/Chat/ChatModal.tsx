"use client";

import * as React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import ChatIcon from "@mui/icons-material/Chat";
import ChatWindow from "./ChatWindow";
import ChatTextbox from "./ChatTextbox";

interface Props {
  media: {
    media_id: number;
    watched: boolean;
    added_reason: string;
    added_by: { user_name: string; profile_pic: string };
    genres: string[];
    media_type: string;
    poster_path: string;
    title: string;
    enabled: boolean;
  };
  groupId: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

const ChatModal = ({ media, groupId }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <ChatIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "fixed", top: 0 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              {`${media.title}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <ChatWindow
          groupId={groupId}
          mediaId={media.media_id}
        />
        <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
          <ChatTextbox
            groupId={groupId}
            mediaId={media.media_id}
          />
        </Box>
      </Dialog>
    </div>
  );
};

export default ChatModal;

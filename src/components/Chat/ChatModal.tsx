"use client";

import * as React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import ChatWindow from "./ChatWindow";
import ChatTextbox from "./ChatTextbox";
import { CondensedMedia } from "@/src/lib/interface";

interface Props {
  media: CondensedMedia;
  groupId: number;
  chatIsOpen: boolean;
  setChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

const ChatModal = ({ media, groupId, chatIsOpen, setChatIsOpen }: Props) => {
  const handleClose = () => {
    setChatIsOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={chatIsOpen}
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
  );
};

export default ChatModal;

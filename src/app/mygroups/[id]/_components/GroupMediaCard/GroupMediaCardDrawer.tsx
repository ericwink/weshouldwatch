"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box, Divider, Drawer } from "@mui/material";
import { useTransition } from "react";
import GroupMediaCardMenuHeader from "./GroupMediaCardMenuHeader";
import GroupMediaCardMenu from "./GroupMediaCardMenu";
import FullScreenLoader from "@/src/components/FullScreenLoader";
import useGroupMediaMenu from "./hooks/useGroupMediaMenu";
import ChatModal from "../Chat/ChatModal";
import UpdateReasonModal from "../UpdateReasonModal/UpdateReasonModal";
import ConfirmDelete from "../../../_components/ConfirmDelete";
import { type MediaData } from "../../_server/getMedia.server";

interface Props {
  mediaData: MediaData;
}

const GroupMediaCardDrawer = ({ mediaData }: Props) => {
  const {
    menuState,
    toggleDrawer,
    toggleChat,
    toggleDeleteModal,
    toggleReasonModal,
  } = useGroupMediaMenu();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <FullScreenLoader isLoading={isPending} />

      {/* <ChatModal
        chatIsOpen={menuState.chatActive}
        groupId={groupId}
        media={{}}
        toggleChat={toggleChat}
      /> */}

      <UpdateReasonModal
        open={menuState.reasonActive}
        toggleModal={toggleReasonModal}
        mediaData={mediaData}
      />

      {/* <ConfirmDelete
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={() => removeMedia()}
        warningMessage="This media and all associated chats will be removed forever."
        isLoading={isLoading}
      /> */}

      <IconButton
        onClick={toggleDrawer}
        sx={{
          backgroundColor: "#ffffff74",
          "&:hover": { backgroundColor: "#ffffffa6" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={menuState.menuActive}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: "auto" }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <GroupMediaCardMenuHeader
            added_reason={mediaData.added_reason}
            user={mediaData.user_public_profile}
          />
          <Divider />
          <GroupMediaCardMenu
            mediaData={mediaData}
            startTransition={startTransition}
            toggleChat={toggleChat}
            toggleReasonModal={toggleReasonModal}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default GroupMediaCardDrawer;

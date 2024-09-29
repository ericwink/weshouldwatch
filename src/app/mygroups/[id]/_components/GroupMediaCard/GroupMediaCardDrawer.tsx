"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box, Divider, Drawer } from "@mui/material";
import { useTransition } from "react";
import GroupMediaCardMenuHeader from "./GroupMediaCardMenuHeader";
import GroupMediaCardMenu from "./GroupMediaCardMenu";
import FullScreenLoader from "@/src/components/FullScreenLoader";
import useGroupMediaMenu from "../hooks/useGroupMediaMenu";
import ChatModal from "../Chat/ChatModal";
import ReasonModal from "../ReasonModal";
import ConfirmDelete from "../../../components/ConfirmDelete";

interface Props {
  user: {
    created_at: string;
    profile_pic: string | null;
    user_id: string;
    user_name: string;
  } | null;
  added_reason: string | null | undefined;
  mediaType: string;
  mediaId: number;
  watched: boolean;
  groupId: string;
}

const GroupMediaCardDrawer = ({
  user,
  added_reason,
  groupId,
  mediaId,
  mediaType,
  watched,
}: Props) => {
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

      <ReasonModal
        open={menuState.reasonActive}
        toggleModal={toggleReasonModal}
        handleSubmit={() => console.log("submit reason")}
        prevReason={added_reason || ""}
        isLoading={isPending}
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
          <GroupMediaCardMenuHeader added_reason={added_reason} user={user} />
          <Divider />
          <GroupMediaCardMenu
            addedByUserId={user?.user_id ?? ""}
            mediaId={mediaId}
            mediaType={mediaType}
            watched={watched}
            groupId={groupId}
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

"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box, Divider, Drawer } from "@mui/material";
import { useTransition } from "react";
import GroupMediaCardMenuHeader from "./GroupMediaCardMenuHeader";
import GroupMediaCardMenu from "./GroupMediaCardMenu";
import FullScreenLoader from "@/src/components/FullScreenLoader";
import useGroupMediaMenu from "./hooks/useGroupMediaMenu";

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
  const { menuState, toggleDrawer } = useGroupMediaMenu();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <FullScreenLoader isLoading={isPending} />
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
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default GroupMediaCardDrawer;

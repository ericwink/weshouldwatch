"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box, Divider, Drawer } from "@mui/material";
import { useState, useTransition } from "react";
import GroupMediaCardMenuHeader from "./GroupMediaCardMenuHeader";
import GroupMediaCardMenu from "./GroupMediaCardMenu";
import FullScreenLoader from "@/src/components/FullScreenLoader";

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
  const [state, setState] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState((prev) => !prev);
  };

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
      <Drawer anchor="bottom" open={state} onClose={toggleDrawer}>
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

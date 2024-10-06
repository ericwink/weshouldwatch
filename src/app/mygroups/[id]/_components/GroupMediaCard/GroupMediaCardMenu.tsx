"use client";

import { List, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useUserStore } from "@/src/lib/store";
import GroupCardMenuItem from "./GroupCardMenuItem";
import { TransitionStartFunction } from "react";
import useToggleWatched from "./hooks/useToggleWatched";

interface Props {
  mediaType: "movies" | "tv";
  mediaId: number;
  watched: boolean;
  addedByUserId: string;
  groupId: string;
  startTransition: TransitionStartFunction;
  toggleChat: () => void;
  toggleReasonModal: () => void;
  userId: string;
  rowId: number;
}

const GroupMediaCardMenu = ({
  mediaId,
  mediaType,
  watched,
  addedByUserId,
  groupId,
  startTransition,
  toggleChat,
  toggleReasonModal,
  rowId,
  userId,
}: Props) => {
  const user = useUserStore((state) => state.user);
  const handleToggleWatched = useToggleWatched();

  const isAddedByCurrentUser = addedByUserId === user?.id;

  return (
    <List>
      <Link
        className="flex"
        href={`/media/${mediaId}/?media_type=${mediaType}`}
      >
        <GroupCardMenuItem
          label="See Details"
          onClick={() => null}
          icon={<InfoIcon />}
        />
      </Link>

      <GroupCardMenuItem
        label="Show Chat"
        onClick={toggleChat}
        icon={<ChatIcon />}
      />

      <GroupCardMenuItem
        label={
          <Typography>
            Mark as {watched ? <b>Not Watched</b> : <b>Watched</b>} by Group
          </Typography>
        }
        onClick={() =>
          handleToggleWatched({
            groupId,
            rowId,
            startTransition,
            userId,
            watched,
            mediaType,
          })
        }
        icon={watched ? <VisibilityOffIcon /> : <VisibilityIcon />}
      />

      {isAddedByCurrentUser && (
        <>
          <GroupCardMenuItem
            label="Edit Reason"
            onClick={toggleReasonModal}
            icon={<EditIcon />}
          />

          <GroupCardMenuItem
            label="Remove From Group"
            onClick={() => "show delete modal"}
            icon={<DeleteForeverIcon />}
          />
        </>
      )}
    </List>
  );
};

export default GroupMediaCardMenu;

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
import { type MediaData } from "../../_server/getMedia.server";

interface Props {
  startTransition: TransitionStartFunction;
  toggleChat: () => void;
  toggleReasonModal: () => void;
  mediaData: MediaData;
}

const GroupMediaCardMenu = ({
  startTransition,
  toggleChat,
  toggleReasonModal,
  mediaData,
}: Props) => {
  const user = useUserStore((state) => state.user);
  if (!user) throw new Error("no user");

  const handleToggleWatched = useToggleWatched();

  const isAddedByCurrentUser = mediaData.added_by === user?.id;

  return (
    <List>
      <Link
        className="flex"
        href={`/media/${mediaData.media_id}/?media_type=${mediaData.media?.media_type}`}
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
            Mark as {mediaData.watched ? <b>Not Watched</b> : <b>Watched</b>} by
            Group
          </Typography>
        }
        onClick={() =>
          handleToggleWatched({
            groupId: mediaData.group_id,
            rowId: mediaData.id,
            startTransition,
            userId: user?.id,
            watched: mediaData.watched,
            mediaType: mediaData.media?.media_type,
          })
        }
        icon={mediaData.watched ? <VisibilityOffIcon /> : <VisibilityIcon />}
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

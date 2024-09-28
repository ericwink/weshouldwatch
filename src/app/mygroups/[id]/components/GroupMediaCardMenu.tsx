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
import { toggleWatched } from "./toggleWatched.server";
import GroupCardMenuItem from "./GroupCardMenuItem";

interface Props {
  mediaType: string;
  mediaId: number;
  watched: boolean;
  addedByUserId: string;
  groupId: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupMediaCardMenu = ({
  mediaId,
  mediaType,
  watched,
  addedByUserId,
  groupId,
  setIsLoading,
}: Props) => {
  const user = useUserStore((state) => state.user);

  const handleToggleWatched = async () => {
    setIsLoading(true);

    try {
      const result = await toggleWatched({
        mediaId,
        watched: !watched,
        groupId,
      });
      if (result?.error) throw new Error(result.error);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        onClick={() => console.log("toggle chat")}
        icon={<ChatIcon />}
      />

      <GroupCardMenuItem
        label={
          <Typography>
            Mark as {watched ? <b>Not Watched</b> : <b>Watched</b>} by Group
          </Typography>
        }
        onClick={() => handleToggleWatched()}
        icon={watched ? <VisibilityOffIcon /> : <VisibilityIcon />}
      />

      {isAddedByCurrentUser && (
        <>
          <GroupCardMenuItem
            label="Edit Reason"
            onClick={() => "show reason modal"}
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

"use client";

import {
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useUserStore } from "@/src/lib/store";
import { toggleWatched } from "./toggleWatched.server";
import { ReactNode, useTransition } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string | ReactNode;
  icon: React.ReactNode;
}

const MenuItem = ({ onClick, label, icon }: MenuItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

interface CardMenuProps {
  mediaType: string;
  mediaId: number;
  watched: boolean;
  addedByUserId: string;
  groupId: string;
}

const GroupMediaCardMenu = ({
  mediaId,
  mediaType,
  watched,
  addedByUserId,
  groupId,
}: CardMenuProps) => {
  const user = useUserStore((state) => state.user);
  const [isPending, startTransition] = useTransition();

  const handleToggleWatched = async () => {
    startTransition(async () => {
      const error = await toggleWatched({
        mediaId,
        watched: !watched,
        groupId,
      });
    });
  };

  const isAddedByCurrentUser = addedByUserId === user?.id;

  return (
    <>
      <Divider />

      <List>
        <Link
          className="flex"
          href={`/media/${mediaId}/?media_type=${mediaType}`}
        >
          <MenuItem
            label="See Details"
            onClick={() => null}
            icon={<InfoIcon />}
          />
        </Link>

        <MenuItem
          label="Show Chat"
          onClick={() => console.log("toggle chat")}
          icon={<ChatIcon />}
        />

        <MenuItem
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
            <MenuItem
              label="Edit Reason"
              onClick={() => "show reason modal"}
              icon={<EditIcon />}
            />

            <MenuItem
              label="Remove From Group"
              onClick={() => "show delete modal"}
              icon={<DeleteForeverIcon />}
            />
          </>
        )}
      </List>
    </>
  );
};

export default GroupMediaCardMenu;

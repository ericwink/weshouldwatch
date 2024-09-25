"use client";

import {
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useUserStore } from "@/src/lib/store";

interface MenuItemProps {
  onClick: () => void;
  label: string;
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
}

const GroupMediaCardMenu = ({
  mediaId,
  mediaType,
  watched,
  addedByUserId,
}: CardMenuProps) => {
  const user = useUserStore((state) => state.user);

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
          label={`Mark as ${!watched && "Not"} Watched by Group`}
          onClick={() => console.log("toggle watched")}
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

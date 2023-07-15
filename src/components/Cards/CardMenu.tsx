import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box, Drawer, List, Divider, Typography, Avatar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import { useUserStore } from "@/src/lib/store";
import Link from "next/link";

interface Props {
  media: {
    media_id: number;
    watched: boolean;
    added_reason: string;
    added_by: { user_name: string; profile_pic: string };
    genres: string[];
    media_type: string;
    poster_path: string;
    title: string;
    enabled: boolean;
  };
  groupId: number;
  setChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardMenu = ({ media, groupId, setChatIsOpen }: Props) => {
  const [state, setState] = React.useState(false);
  const user = useUserStore(state => state.user);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState(open);
  };

  const list = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
        mt={2}
        mb={2}
      >
        <Avatar
          src={media.added_by.profile_pic}
          alt={media.added_by.user_name}
          sx={{ height: 100, width: 100 }}
        />
        <Typography variant="caption">{media.added_by.user_name}</Typography>
        <Typography variant="h6">{`"${media.added_reason}"`}</Typography>
      </Box>
      <Divider />

      <List>
        <Link
          className="flex"
          href={`/media/${media.media_id}/?media_type=${media.media_type}`}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"See Details"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setChatIsOpen(true)}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={"Show Chat"} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ backgroundColor: "#ffffff74", "&:hover": { backgroundColor: "#ffffffa6" } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </div>
  );
};

export default CardMenu;

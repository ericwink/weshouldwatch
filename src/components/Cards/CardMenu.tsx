import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box, Drawer, List, Divider, Typography, Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import { useUserStore } from "@/src/lib/store";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CondensedMedia } from "@/src/lib/interface";
import axios from "axios";

interface Props {
  media: CondensedMedia;
  groupId: string;
  setChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReasonModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardMenu = ({ media, groupId, setChatIsOpen, setShowReasonModal, setShowDeleteModal }: Props) => {
  const [state, setState] = React.useState(false);
  const user = useUserStore(state => state.user);
  const queryClient = useQueryClient();

  const chatToggle = () => {
    if (!user?.is_subscribed) return toast.warning("Get Premium to access this feature!", { theme: "colored" });
    setChatIsOpen(true);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState(open);
  };

  const { mutate: toggleWatched } = useMutation({
    mutationFn: async () => await axios.post("/api/group/editMedia", { columnToUpdate: "watched", newValue: !media.watched, rowId: media.entry_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupMedia", { id: groupId }, { type: media.media_type }] });
      toast.success(`Updated to ${media.watched === true ? "Not Watched" : "Watched"}`, { theme: "colored" });
    },
    onError: () => toast.error("There was an error, please try again!", { theme: "colored" }),
  });

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
        {media?.added_reason && <Typography variant="h6">{`"${media?.added_reason}"`}</Typography>}
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
          <ListItemButton onClick={chatToggle}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={"Show Chat"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => toggleWatched()}>
            <ListItemIcon>{!media.watched ? <VisibilityIcon /> : <VisibilityOffIcon />}</ListItemIcon>
            <ListItemText primary={!media.watched ? "Mark as Watched by Group" : "Mark as Not Watched by Group"} />
          </ListItemButton>
        </ListItem>

        {media.added_by.user_id === user?.id && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setShowReasonModal(true)}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={"Edit Reason"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setShowDeleteModal(true)}>
                <ListItemIcon>
                  <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText primary={"Remove From Group"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
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

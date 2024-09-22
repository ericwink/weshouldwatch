"use client";

import {
  Box,
  List,
  ListItem,
  Avatar,
  Typography,
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

const GroupMediaCardMenu = async () => {
  return (
    <>
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
          //   src={media.added_by.profile_pic}
          //   alt={media.added_by.user_name}
          sx={{ height: 100, width: 100 }}
        />
        <Typography variant="caption">Added By User Name</Typography>
        {data.added_reason && (
          <Typography
            textAlign="center"
            variant="h6"
          >{`"${media?.added_reason}"`}</Typography>
        )}
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
            <ListItemIcon>
              {!media.watched ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ListItemIcon>
            <ListItemText
              primary={
                !media.watched
                  ? "Mark as Watched by Group"
                  : "Mark as Not Watched by Group"
              }
            />
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
    </>
  );
};

export default GroupMediaCardMenu;

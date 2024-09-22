import { Database } from "@/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
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

interface Props {
  groupMediaId: number;
  groupId: string;
  mediaType: string;
}

const GroupMediaCardMenu = async ({
  groupId,
  groupMediaId,
  mediaType,
}: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("group_media")
    .select(`*, user_public_profile ( user_name, profile_pic )`)
    .eq("group_id", groupId)
    .eq("id", groupMediaId)
    .single();

  if (error || !data)
    throw new Error("There was an error getting this data. Try again");

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
          src={data.user_public_profile?.profile_pic ?? ""}
          alt={data.user_public_profile?.user_name ?? "blank avatar"}
          sx={{ height: 100, width: 100 }}
        />
        <Typography variant="caption">
          Added By {data.user_public_profile?.user_name}
        </Typography>
        {data.added_reason && (
          <Typography
            textAlign="center"
            variant="h6"
          >{`"${data.added_reason}"`}</Typography>
        )}
      </Box>
      <Divider />

      <List>
        <Link
          className="flex"
          href={`/media/${data.media_id}/?media_type=${mediaType}`}
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
          <ListItemButton>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={"Show Chat"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {!data.watched ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ListItemIcon>
            <ListItemText
              primary={
                !data.watched
                  ? "Mark as Watched by Group"
                  : "Mark as Not Watched by Group"
              }
            />
          </ListItemButton>
        </ListItem>

        {/* {data.added_by.user_id === user?.id && (
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
        )} */}
      </List>
    </>
  );
};

export default GroupMediaCardMenu;

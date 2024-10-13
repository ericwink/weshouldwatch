import { Paper, Box, Avatar, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import getPoster from "@/src/lib/getPoster";
import Image from "next/image";
import GroupMediaCardDrawer from "../_components/GroupMediaCard/GroupMediaCardDrawer";
import { type MediaData } from "../_server/getMedia.server";

interface Props {
  mediaData: MediaData;
}

const GroupMediaCard = ({ mediaData }: Props) => {
  if (!mediaData || !mediaData.media || !mediaData.user_public_profile)
    return null;

  const { user_public_profile: user, media } = mediaData;

  return (
    <Grid>
      <Paper elevation={3} sx={{ width: "135px", height: "100%" }}>
        <Box sx={{ height: 200, position: "relative" }}>
          <Image
            src={getPoster(media.poster_path, "200")}
            alt={media.title}
            fill={true}
            style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
          />
          <Avatar
            src={user?.profile_pic ?? ""}
            sx={{
              height: 45,
              width: 45,
              position: "absolute",
              left: "2px",
              top: "2px",
              border: "1px",
              borderColor: "white",
              borderStyle: "solid",
            }}
          ></Avatar>
          <Box position="absolute" bottom="2px" right="2px">
            <GroupMediaCardDrawer mediaData={mediaData} />
          </Box>
        </Box>
        <Grid container p={1}>
          <Grid xs={12}>
            <Typography>{media.title}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default GroupMediaCard;

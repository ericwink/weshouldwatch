import { Paper, Box, Avatar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import getPoster from "@/src/lib/getPoster";
import Image from "next/image";
import Link from "next/link";

interface Props {
  groupMediaId: number;
  media: {
    poster_path: string;
    title: string;
  } | null;
  user: {
    profile_pic: string | null;
  } | null;
}

const GroupMediaCard = ({ media, user, groupMediaId }: Props) => {
  if (!media) return null;

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
            <IconButton
              LinkComponent={Link}
              href={`/groupMedia/${groupMediaId}`}
              sx={{
                backgroundColor: "#ffffff74",
                "&:hover": { backgroundColor: "#ffffffa6" },
              }}
            >
              <MenuIcon />
            </IconButton>
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

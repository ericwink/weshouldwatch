"use client";

import getPoster from "@/src/lib/getPoster";
import { Paper, Typography, Box, Avatar, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
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
}

const MediaCardCollection = ({ media }: Props) => {
  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{ width: "135px" }}
      >
        <Box sx={{ height: 200, position: "relative" }}>
          <Image
            src={getPoster(media.poster_path, "200")}
            alt={media.title}
            fill={true}
            style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
          />
          <Avatar
            src={media.added_by.profile_pic}
            sx={{ height: 40, width: 40, position: "absolute", left: "5px", top: "5px" }}
          >
            EW
          </Avatar>
        </Box>
        <Grid
          container
          p={1}
        >
          <Grid xs={12}>
            <Typography
              variant="body2"
              component="p"
            >
              {media.added_reason}
            </Typography>
            <Grid xs={12}>
              <Typography
                variant="subtitle2"
                component="p"
              >
                - {media.added_by.user_name}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Link
                className="flex"
                href={`/media/${media.media_id}/?media_type=${media.media_type}`}
              >
                <Button>View Details</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MediaCardCollection;

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
    added_by: string;
    genres: string[];
    media_type: string;
    poster_path: string;
    enabled: boolean;
    title: string;
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
          <Avatar sx={{ height: 40, width: 40, position: "absolute", left: "5px", top: "5px" }}>{media.added_by.slice(0, 1)}</Avatar>
        </Box>
        <Grid
          container
          p={1}
        >
          <Grid xs={12}>
            <Typography
              variant="subtitle2"
              component="p"
              textAlign="center"
            >
              {media.added_reason}
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
      </Paper>
    </Grid>
  );
};

export default MediaCardCollection;

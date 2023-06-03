"use client";

import getPoster from "@/lib/getPoster";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";

interface Props {
  media: {
    poster_path: string;
    title?: string;
    name?: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    id: number;
    media_type: string;
  };
}

// {
//   id: 240,
//   title: 'The Godfather Part II',
//   poster_path: '/bMadFzhjy9T7R8J48QGq1ngWNAK.jpg',
//   media_type: 'movie',
//   vote_average: 8.595,
//   vote_count: 10881
// },

const MediaCardMUI = ({ media }: Props) => {
  const title = media.title ? media.title : media.name;
  const date = media.release_date ? media.release_date : media.first_air_date;

  console.log(media.title);

  return (
    <Grid
      xs={4}
      sm={3}
      md={2}
    >
      <Paper elevation={3}>
        <Box sx={{ height: 200, position: "relative" }}>
          <Image
            src={getPoster(media.poster_path, "200")}
            alt={title!}
            fill={true}
            style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
          />
        </Box>
        <Grid container>
          <Grid
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2">{(media.vote_average * 10).toFixed(0)}%</Typography>
          </Grid>
          <Grid
            xs={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2">{date!.slice(0, 4)}</Typography>
          </Grid>
          <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton>
              <Link
                className="flex"
                href={`/media/${media.id}/?media_type=${media.media_type}`}
              >
                <InfoIcon />
              </Link>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MediaCardMUI;

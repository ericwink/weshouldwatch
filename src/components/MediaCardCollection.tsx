"use client";

import getPoster from "@/src/lib/getPoster";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";

interface Props {
  media: {
    poster_path: string;
    title: string;
    media_id: number;
    media_type: string;
    watched: boolean;
    added_reason: string;
    added_by: string;
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
        </Box>
        <Grid container>
          <Grid
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              component="p"
            >
              % was here
            </Typography>
          </Grid>
          <Grid
            xs={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              component="p"
            >
              date was here
            </Typography>
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
                href={`/media/${media.media_id}/?media_type=${media.media_type}`}
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

export default MediaCardCollection;

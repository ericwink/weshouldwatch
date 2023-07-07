"use client";

import getPoster from "@/src/lib/getPoster";
import { Paper, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
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

const MediaCardMUI = ({ media }: Props) => {
  const title = media.title ? media.title : media.name;
  const date = media.release_date ? media.release_date : media.first_air_date;

  return (
    <Grid>
      <button>
        <Link
          className="flex"
          href={`/media/${media.id}/?media_type=${media.media_type}`}
        >
          <Paper
            elevation={3}
            sx={{ width: "135px" }}
          >
            <Box sx={{ height: 200, position: "relative" }}>
              <Image
                src={getPoster(media.poster_path, "200")}
                alt={title!}
                fill={true}
                style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
              />
            </Box>
            {/* <Grid
              container
              p={1}
            > */}
            {/* <Grid
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  component="p"
                >
                  {`${(media.vote_average * 10).toFixed(0)}%`}
                </Typography>
              </Grid> */}
            {/* <Grid
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  component="p"
                >
                  {date ? date.slice(0, 4) : "No Date"}
                </Typography>
              </Grid>
              <Grid
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Grid>
            </Grid> */}
          </Paper>
        </Link>
      </button>
    </Grid>
  );
};

export default MediaCardMUI;

"use client";

import getPoster from "@/lib/getPoster";
import { Paper, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";

const media = {
  adult: false,
  backdrop_path: "/1IM8i8HiomFC4y6NRyBuDrHJWg3.jpg",
  id: 447277,
  title: "The Little Mermaid",
  original_language: "en",
  original_title: "The Little Mermaid",
  overview:
    "The youngest of King Triton’s daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea, and while visiting the surface, falls for the dashing Prince Eric. With mermaids forbidden to interact with humans, Ariel makes a deal with the evil sea witch, Ursula, which gives her a chance to experience life on land, but ultimately places her life – and her father’s crown – in jeopardy.",
  poster_path: "/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
  media_type: "movie",
  genre_ids: [12, 10751, 14, 10749],
  popularity: 2053.325,
  release_date: "2023-05-18",
  video: false,
  vote_average: 6,
  vote_count: 369,
};

const MediaCardMUI = () => {
  return (
    <Grid xs={3}>
      <Paper elevation={3}>
        <Box sx={{ height: 200, position: "relative" }}>
          <Image
            src={getPoster(media.poster_path, "200")}
            alt={media.title}
            fill={true}
            style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
          />
        </Box>
        <Grid
          container
          mt={1}
        >
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
          >
            <Typography>{media.title}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          mt={1}
          pb={1}
        >
          <Grid
            xs={6}
            display="flex"
            justifyContent="center"
          >
            <p>date</p>
          </Grid>
          <Grid
            xs={6}
            display="flex"
            justifyContent="center"
          >
            <p>rating</p>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MediaCardMUI;

"use client";

import MediaCardMUI from "@/components/MediaCardMUI";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CssBaseline, Container } from "@mui/material";

const TrendingGrid = ({ data }) => {
  return (
    <>
      <CssBaseline />
      <Container>
        <h1>MUI PAGE</h1>
        <Grid
          container
          spacing={1}
          justifyContent="center"
        >
          {data.map(each => (
            <MediaCardMUI media={each} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TrendingGrid;

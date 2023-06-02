"use client";

import MediaCardMUI from "@/components/MediaCardMUI";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CssBaseline, Container } from "@mui/material";

const muiPage = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <h1>MUI PAGE</h1>
        <Grid
          container
          spacing={1}
        >
          <MediaCardMUI />
          <MediaCardMUI />
          <MediaCardMUI />
          <MediaCardMUI />
        </Grid>
      </Container>
    </>
  );
};

export default muiPage;

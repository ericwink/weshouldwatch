"use client";

import { CircularProgress, Container, Typography } from "@mui/material";

const groupsLoadingPage = () => {
  return (
    <main>
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          component="h2"
          m={1}
        >
          My Groups
        </Typography>
        <Typography>Loading Groups...</Typography>
        <CircularProgress />
      </Container>
    </main>
  );
};

export default groupsLoadingPage;

"use client"; // Error components must be Client Components

import { Button, Typography, Container } from "@mui/material";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
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
        <Typography variant="h2">Something went wrong!</Typography>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </Container>
    </main>
  );
}

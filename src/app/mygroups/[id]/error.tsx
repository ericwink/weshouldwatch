"use client";

import { Button, Typography, Container } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h2">{error.message}</Typography>
      <Button variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </Container>
  );
}

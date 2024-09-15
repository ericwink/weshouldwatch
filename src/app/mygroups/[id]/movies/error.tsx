"use client"; // Error components must be Client Components

import { Button, Typography, Container } from "@mui/material";
import TabDisplay from "@/src/components/TabDisplay";

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
      <Button
        variant="contained"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Container>
  );
}

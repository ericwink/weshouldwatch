"use client"; // Error components must be Client Components

import { Button, Typography, Container } from "@mui/material";
import TabDisplay from "@/src/components/TabDisplay";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const display = (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
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
  );

  return (
    <main>
      <TabDisplay tabNames={["Movies", "TV Shows", "Group Info"]}>
        {display}
        {display}
        {display}
      </TabDisplay>
    </main>
  );
}

"use client";

import TabDisplay from "@/src/components/TabDisplay";
import CardSkeleton from "@/src/components/Cards/CardSkeleton";
import CardGrid from "@/src/components/Cards/CardGrid";
import { CircularProgress, Box, Typography, Container, Skeleton } from "@mui/material";

const mainPageLoading = () => {
  const cardSkeleton = Array.from({ length: 12 }, (_, i) => <CardSkeleton key={i} />);

  const cardsLoader = (
    <Container maxWidth="md">
      <Skeleton
        height={50}
        width="100%"
        animation="wave"
      />
      <CardGrid>{cardSkeleton}</CardGrid>
    </Container>
  );

  return (
    <>
      <TabDisplay tabNames={["Movies", "TV Shows", "Group Info"]}>
        {cardsLoader}
        {cardsLoader}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center" }}>
          <Typography>Loading Group Info...</Typography>
          <CircularProgress />
        </Box>
      </TabDisplay>
    </>
  );
};

export default mainPageLoading;

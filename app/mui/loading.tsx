"use client";

import TabDisplay from "@/components/TabDisplay";
import CardGrid from "@/components/CardGrid";
import { Skeleton, Stack, Grid, Container } from "@mui/material";

const mainPageLoading = () => {
  const cardSkeleton = Array.from({ length: 12 }, (_, i) => (
    <Grid
      xs={4}
      sm={3}
      md={2}
      key={i}
    >
      <Stack
        spacing={0.5}
        m={0.5}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={180}
          width={150}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={40}
          width={150}
        />
      </Stack>
    </Grid>
  ));

  return (
    <>
      <TabDisplay tabNames={["Trending Movies", "Trending TV", "Trending People"]}>
        <CardGrid>{cardSkeleton}</CardGrid>
        <CardGrid>{cardSkeleton}</CardGrid>
        <CardGrid>{cardSkeleton}</CardGrid>
      </TabDisplay>
    </>
  );
};

export default mainPageLoading;

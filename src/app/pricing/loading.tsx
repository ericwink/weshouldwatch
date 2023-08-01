"use client";

import { Skeleton, Paper, Divider } from "@mui/material";

const card = (
  <Paper sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2, alignItems: "center", width: "250px" }}>
    <Skeleton
      variant="rectangular"
      height={20}
      width="100%"
      sx={{ mb: 1 }}
    />
    <Skeleton
      variant="rectangular"
      height={40}
      width="100%"
      sx={{ mb: 1 }}
    />
    <Divider
      orientation="horizontal"
      flexItem
    />
    <Skeleton
      variant="rectangular"
      height={10}
      width="100%"
    />
    <Divider
      orientation="horizontal"
      flexItem
    />
    <Skeleton
      variant="rectangular"
      height={10}
      width="100%"
    />
    <Divider
      orientation="horizontal"
      flexItem
    />
    <Skeleton
      variant="rectangular"
      height={10}
      width="100%"
    />
    <Divider
      orientation="horizontal"
      flexItem
      sx={{ marginBottom: 1 }}
    />
    <Skeleton
      variant="rectangular"
      height={20}
      width="100%"
    />
  </Paper>
);

const mainPageLoading = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 pt-10 lg:flex-row lg:h-[calc(100vh-65px)] lg:pt-0">
      {card}
      {card}
      {card}
    </div>
  );
};

export default mainPageLoading;

"use client";

import { Typography, Paper, Skeleton } from "@mui/material";

const groupsLoadingPage = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Paper sx={{ minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
        <Typography>You have been invited to a group by</Typography>
        <Skeleton
          variant="rectangular"
          width="80%"
          height={32}
          animation="wave"
        />
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={110}
          height={32}
          animation="wave"
        />
      </Paper>
    </div>
  );
};

export default groupsLoadingPage;

"use client";

import { Skeleton, Typography, Paper } from "@mui/material";

const AccountLoad = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Paper sx={{ width: "300px", height: "420px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          mb={1}
        >
          Account Details
        </Typography>
        <Skeleton
          variant="rectangular"
          width={260}
          height={35}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={195}
          height={56}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={161}
          height={36}
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
          width={145}
          height={36}
          animation="wave"
        />
      </Paper>
    </div>
  );
};

export default AccountLoad;

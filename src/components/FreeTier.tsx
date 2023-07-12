"use client";
import { Paper, Typography } from "@mui/material";

const FreeTier = () => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center", width: "250px" }}>
      <Typography
        variant="h5"
        textAlign="center"
      >
        {`Free Tier`}
      </Typography>
      <Typography>{`No Cost!`}</Typography>
      <Typography>{`Limited to One Group`}</Typography>
    </Paper>
  );
};

export default FreeTier;

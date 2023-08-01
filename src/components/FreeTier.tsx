"use client";
import { Paper, Typography, Divider, Button } from "@mui/material";

const FreeTier = () => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2, alignItems: "center", width: "250px" }}>
      <Typography textAlign="center">{`Basic`}</Typography>
      <Typography
        variant="h4"
        mb={1}
      >{`Free`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
      />
      <Typography>{`Create Only One Group`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
      />
      <Typography>{`Join Only One Group`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
      />
      <Typography>{`No Journal/Live Chat`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ marginBottom: 1 }}
      />
    </Paper>
  );
};

export default FreeTier;

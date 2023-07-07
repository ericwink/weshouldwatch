"use client";

import { Paper, Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import Link from "next/link";

interface Props {
  created_at: string | null;
  group_name: string | null;
  id: number;
}

const GroupCard = ({ group_name, id }: Props) => {
  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{ p: 1, minWidth: "160px" }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {group_name}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <GroupIcon />
            <Typography># Members</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <MovieIcon />
            <Typography># Media</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link
              className="flex"
              href={`/mygroups/${id}`}
            >
              <Button>View Details</Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default GroupCard;
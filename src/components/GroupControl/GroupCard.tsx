"use client";

import { Paper, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import Link from "next/link";
import DeleteGroup from "./DeleteGroup";
import { useUserStore } from "@/src/lib/store";

interface Props {
  created_at: string | null;
  group_name: string | null;
  id: number;
  created_by: string;
}

const GroupCard = ({ group_name, id, created_by }: Props) => {
  const user = useUserStore(state => state.user);

  return (
    <Grid xs={12}>
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
        <Grid container>
          <Grid
            sm={4}
            gap={2}
            container
          >
            <GroupIcon />
            <Typography>#</Typography>
          </Grid>
          <Grid
            sm={4}
            gap={2}
            container
          >
            <MovieIcon />
            <Typography>#</Typography>
          </Grid>
          <Grid
            sm={4}
            gap={2}
            container
          >
            <TvIcon />
            <Typography>#</Typography>
          </Grid>
          <Grid
            sm={12}
            container
            justifyContent="space-between"
          >
            <Link
              className="flex"
              href={`/mygroups/${id}`}
            >
              <Button variant="contained">View Details</Button>
            </Link>
            {user?.id === created_by && (
              <DeleteGroup
                group_name={group_name}
                id={id}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default GroupCard;

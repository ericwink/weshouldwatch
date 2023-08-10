"use client";

import { Paper, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import Link from "next/link";
import DeleteGroup from "./DeleteGroup";
import LeaveGroup from "./LeaveGroup";
import { useUserStore } from "@/src/lib/store";
import GroupLock from "./GroupLock";

interface Props {
  id: string;
  group_name: string;
  created_by: string;
  group_media: { movie: number; tv: number };
  members: number;
  showLock: boolean;
}

const GroupCard = ({ group_name, id, created_by, group_media, members, showLock }: Props) => {
  const user = useUserStore(state => state.user);

  return (
    <Grid xs={12}>
      <Paper
        elevation={3}
        sx={{ p: 1, minWidth: "160px" }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography
            variant="h5"
            component="div"
            mb={2}
          >
            {group_name}
          </Typography>
          {showLock && (
            <GroupLock
              groupId={id}
              created_by={created_by}
            />
          )}
        </Box>
        <Grid container>
          <Grid
            xs={4}
            gap={2}
            container
            justifyContent="center"
          >
            <GroupIcon />
            <Typography>{members}</Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>Members</Typography>
          </Grid>
          <Grid
            xs={4}
            gap={2}
            container
            justifyContent="center"
          >
            <MovieIcon />
            <Typography>{group_media.movie}</Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>Movies</Typography>
          </Grid>
          <Grid
            xs={4}
            gap={2}
            container
            justifyContent="center"
          >
            <TvIcon />
            <Typography>{group_media.tv}</Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>TV Shows</Typography>
          </Grid>
          <Grid
            xs={12}
            container
            justifyContent="space-between"
            mt={1}
          >
            <Link
              className="flex"
              href={`/mygroups/${id}`}
            >
              <Button>View Details</Button>
            </Link>
            {user?.id === created_by ? (
              <DeleteGroup
                group_name={group_name}
                id={id}
              />
            ) : (
              <LeaveGroup
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

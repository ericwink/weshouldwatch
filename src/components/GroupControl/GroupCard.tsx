"use client";

import { Paper, Typography, Button, Box, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import Link from "next/link";
import DeleteGroup from "./DeleteGroup";
import LeaveGroup from "./LeaveGroup";
import { useUserStore } from "@/src/lib/store";
import GroupLock from "./GroupLock";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  group_name: string;
  created_by: string;
  group_media: { movie: number; tv: number };
  members: number;
  showLock: boolean;
}

const GroupCard = ({
  group_name,
  id,
  created_by,
  group_media,
  members,
  showLock,
}: Props) => {
  const user = useUserStore((state) => state.user);

  return (
    <Grid xs={12}>
      <Paper elevation={3} sx={{ p: 1, minWidth: "160px" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="h5" component="div" mb={2}>
            {group_name}
          </Typography>
          {showLock && <GroupLock groupId={id} created_by={created_by} />}
        </Box>
        <div className="flex justify-between gap-2">
          <Button
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
            LinkComponent={Link}
            href={`/mygroups/${id}/info`}
          >
            <GroupIcon />
            <Typography>{members}</Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Members
            </Typography>
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
            LinkComponent={Link}
            href={`/mygroups/${id}/movies?watched=false`}
          >
            <MovieIcon />
            <Typography>{group_media.movie}</Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Movies
            </Typography>
          </Button>
          <Divider orientation="vertical" flexItem />

          <Button
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
            LinkComponent={Link}
            href={`/mygroups/${id}/tv?watched=false`}
          >
            <TvIcon />
            <Typography>{group_media.tv}</Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              TV Shows
            </Typography>
          </Button>
        </div>

        <div className="min-w-full flex justify-end mt-5">
          {user?.id === created_by ? (
            <DeleteGroup group_name={group_name} id={id} />
          ) : (
            <LeaveGroup group_name={group_name} id={id} />
          )}
        </div>

        {/* <Link className="flex" href={`/mygroups/${id}`}>
              <Button>View Details</Button>
            </Link> */}
      </Paper>
    </Grid>
  );
};

export default GroupCard;

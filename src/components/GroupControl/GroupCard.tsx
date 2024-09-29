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
import { ReactNode } from "react";

interface Props {
  id: string;
  group_name: string;
  created_by: string;
  group_media: { movie: number; tv: number };
  members: number;
  showLock: boolean;
}

const buttonFormat = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: { xs: 0, sm: 1 },
};

const innerButtonFormat = {
  display: "flex",
  gap: 1,
};

interface FormattedButtonProps {
  link: string;
  children: ReactNode;
}

const FormattedButton = ({ children, link }: FormattedButtonProps) => (
  <Button sx={buttonFormat} LinkComponent={Link} href={link}>
    {children}
  </Button>
);

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
          <FormattedButton link={`/mygroups/${id}/info`}>
            <Box sx={innerButtonFormat}>
              <GroupIcon />
              <Typography>{members}</Typography>
            </Box>
            <Typography>Members</Typography>
          </FormattedButton>

          <Divider orientation="vertical" flexItem />

          <FormattedButton link={`/mygroups/${id}/movies?watched=false`}>
            <Box sx={innerButtonFormat}>
              <MovieIcon />
              <Typography>{group_media.movie}</Typography>
            </Box>
            <Typography>Movies</Typography>
          </FormattedButton>

          <Divider orientation="vertical" flexItem />

          <FormattedButton link={`/mygroups/${id}/tv?watched=false`}>
            <Box sx={innerButtonFormat}>
              <TvIcon />
              <Typography>{group_media.tv}</Typography>
            </Box>
            <Typography>TV Shows</Typography>
          </FormattedButton>
        </div>

        <div className="min-w-full flex justify-end mt-5">
          {user?.id === created_by ? (
            <DeleteGroup group_name={group_name} id={id} />
          ) : (
            <LeaveGroup group_name={group_name} id={id} />
          )}
        </div>
      </Paper>
    </Grid>
  );
};

export default GroupCard;

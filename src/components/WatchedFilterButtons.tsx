"use client";

import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

interface Props {
  setWatchedFilter: React.Dispatch<React.SetStateAction<string>>;
  watchedFilter: string;
}

export default function WatchedFilterButtons({ setWatchedFilter, watchedFilter }: Props) {
  return (
    <>
      <Grid>
        <Button
          size="small"
          variant={watchedFilter === "all" ? "contained" : "outlined"}
          onClick={() => setWatchedFilter("all")}
        >
          All
        </Button>
      </Grid>
      <Grid>
        <Button
          size="small"
          variant={watchedFilter === "notWatched" ? "contained" : "outlined"}
          onClick={() => setWatchedFilter("notWatched")}
        >
          Not Watched
        </Button>
      </Grid>
      <Grid>
        <Button
          size="small"
          variant={watchedFilter === "watched" ? "contained" : "outlined"}
          onClick={() => setWatchedFilter("watched")}
        >
          Watched
        </Button>
      </Grid>
    </>
  );
}

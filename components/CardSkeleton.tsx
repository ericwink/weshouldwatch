import { Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const CardSkeleton = () => {
  return (
    <Grid
      xs={4}
      sm={3}
      md={2}
    >
      <Stack
        spacing={0.5}
        m={0.5}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={180}
          width={135}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={40}
          width={135}
        />
      </Stack>
    </Grid>
  );
};

export default CardSkeleton;

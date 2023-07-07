import { Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const CardSkeleton = () => {
  return (
    <Grid>
      <Stack spacing={0.5}>
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

"use client";

import { Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

interface genreObject {
  id: number;
  name: string;
}

interface Props {
  genre_ids: genreObject[];
}

const Genres = ({ genre_ids }: Props) => {
  const genres = genre_ids.map(each => {
    return (
      <Grid key={each.name}>
        <Chip label={each.name} />
      </Grid>
    );
  });

  return (
    <Grid
      container
      justifyContent="center"
      spacing={1}
    >
      {genres}
    </Grid>
  );
};

export default Genres;

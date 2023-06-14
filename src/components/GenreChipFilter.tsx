"use client";

import { SyntheticEvent } from "react";
import { Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

interface Props {
  genres: {
    genre: string;
    enabled: boolean;
  }[];
  setGenres: React.Dispatch<
    React.SetStateAction<
      {
        genre: string;
        enabled: boolean;
      }[]
    >
  >;
}

export default function GenreChipFilter({ genres, setGenres }: Props) {
  const updateGenres = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const selectedGenre = target.innerText;

    const updatedGenres = genres.map(genre => {
      if (genre.genre === selectedGenre) {
        return { genre: selectedGenre, enabled: !genre.enabled };
      } else {
        return genre;
      }
    });

    setGenres(updatedGenres);
  };

  const chips = genres.map(genre => {
    if (genre.enabled)
      return (
        <Grid>
          <Chip
            label={genre.genre}
            onClick={updateGenres}
          />
        </Grid>
      );
    if (!genre.enabled)
      return (
        <Grid>
          <Chip
            label={genre.genre}
            onClick={updateGenres}
            variant="outlined"
          />
        </Grid>
      );
  });

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      mb={2}
    >
      {chips}
    </Grid>
  );
}

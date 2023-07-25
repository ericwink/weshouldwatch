"use client";

import { SyntheticEvent } from "react";
import { Chip, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

interface Props {
  setHideWatched: React.Dispatch<React.SetStateAction<boolean>>;
  hideWatched: boolean;
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

export default function GenreChipFilter({ genres, setGenres, setHideWatched, hideWatched }: Props) {
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
        <Grid key={genre.genre}>
          <Chip
            label={genre.genre}
            onClick={updateGenres}
          />
        </Grid>
      );
    if (!genre.enabled)
      return (
        <Grid key={genre.genre}>
          <Chip
            label={genre.genre}
            onClick={updateGenres}
            variant="outlined"
          />
        </Grid>
      );
  });

  return (
    <>
      <Grid
        container
        spacing={1}
        mb={1}
        justifyContent="center"
      >
        {chips}
      </Grid>
      <Button
        fullWidth
        onClick={() => setHideWatched(prev => !prev)}
      >
        {hideWatched ? "Show Watched" : "Hide Watched"}
      </Button>
    </>
  );
}

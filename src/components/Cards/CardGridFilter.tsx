"use client";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import GenreChipFilter from "../GenreChipFilter";
import MediaCardCollection from "./MediaCardCollection";
import AccordionChildren from "../../ui/AccordionChildren";

interface Condensed {
  entry_id: number;
  media_id: number;
  watched: boolean;
  added_reason: string;
  added_by: { user_id: string; user_name: string; profile_pic: string };
  genres: string[];
  media_type: string;
  poster_path: string;
  title: string;
  enabled: boolean;
}

interface GenreFilter {
  genre: string;
  enabled: boolean;
}

interface Props {
  mediaData: Condensed[];
  groupId: number;
}

const makeGenreArray = (mediaData: Condensed[]) => {
  const genreSet = new Set();
  const genreArray: GenreFilter[] = [];
  for (let media of mediaData) {
    media.genres.forEach(genre => genreSet.add(genre));
  }
  genreSet.forEach(genreName => genreArray.push({ genre: genreName as string, enabled: true }));
  return genreArray;
};

const CardGridFilter = ({ mediaData, groupId }: Props) => {
  const [cards, setCards] = useState(mediaData);
  const [genres, setGenres] = useState(makeGenreArray(mediaData));

  useEffect(() => {
    const updatedMedia = cards.map(card => {
      let score = 0;
      for (let each of genres) {
        if (card.genres.find(g => g === each.genre) && each.enabled === true) score++;
      }
      if (score >= 1) {
        card.enabled = true;
      } else {
        card.enabled = false;
      }
      return card;
    });
    setCards(updatedMedia);
  }, [genres]);

  const cardDisplay = cards.map(card => {
    if (card.enabled === true)
      return (
        <MediaCardCollection
          media={card}
          key={card.media_id}
          groupId={groupId}
        />
      );
  });

  return (
    <Container maxWidth="md">
      <AccordionChildren title="Filters">
        <GenreChipFilter
          genres={genres}
          setGenres={setGenres}
        />
      </AccordionChildren>
      <Grid
        container
        spacing={1}
        mt={2}
        justifyContent="center"
      >
        {cardDisplay}
      </Grid>
    </Container>
  );
};

export default CardGridFilter;

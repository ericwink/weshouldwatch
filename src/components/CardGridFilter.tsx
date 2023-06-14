"use client";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import GenreChipFilter from "./GenreChipFilter";
import MediaCardCollection from "./MediaCardCollection";

// const exampleData = [
//   {
//     media_id: 569094,
//     watched: false,
//     added_reason: "this is a client test",
//     added_by: "a8ba9e52-2368-4b1d-969c-c539f1ca43f4",
//     genres: ["Animation", "Science Fiction"],
//     media_type: "movie",
//     poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
//     title: "Spider-Man: Across the Spider-Verse",
//     enabled: true,
//   },
//   {
//     media_id: 324857,
//     watched: false,
//     added_reason: "I love this movie!",
//     added_by: "a8ba9e52-2368-4b1d-969c-c539f1ca43f4",
//     genres: ["Action", "Adventure", "Animation", "Science Fiction"],
//     media_type: "movie",
//     poster_path: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
//     title: "Spider-Man: Into the Spider-Verse",
//     enabled: true,
//   },
//   {
//     media_id: 127529,
//     watched: false,
//     added_reason: "Looks like a cool show about boxing",
//     added_by: "a8ba9e52-2368-4b1d-969c-c539f1ca43f4",
//     genres: ["Action & Adventure", "Drama", "Crime"],
//     media_type: "tv",
//     poster_path: "/kxU1hhebWZGaz8gkMVi8zkZhzVt.jpg",
//     title: "Bloodhounds",
//     enabled: true,
//   },
// ];

const initialGenres = [
  { genre: "Action", enabled: true },
  { genre: "Adventure", enabled: true },
  { genre: "Animation", enabled: true },
  { genre: "Science Fiction", enabled: true },
  { genre: "Action & Adventure", enabled: true },
  { genre: "Drama", enabled: true },
  { genre: "Crime", enabled: true },
];

interface Condensed {
  media_id: number;
  watched: boolean;
  added_reason: string;
  added_by: string;
  genres: string[];
  media_type: string;
  poster_path: string;
  enabled: boolean;
  title: string;
}

interface Props {
  mediaData: Condensed[];
}

const makeGenreArray = (mediaData: Condensed) => {
  const genreSet = new Set();
  const genreArray = [];
  for (let media of mediaData) {
    media.genres.forEach(genre => genreSet.add(genre));
  }
  genreSet.forEach(genreName => genreArray.push({ genre: genreName, enabled: true }));
  return genreArray;
};

const CardGridFilter = ({ mediaData }: Props) => {
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
        />
      );
  });

  return (
    <Container maxWidth="md">
      <GenreChipFilter
        genres={genres}
        setGenres={setGenres}
      />
      <Grid
        container
        spacing={1}
        justifyContent="center"
      >
        {cardDisplay}
      </Grid>
    </Container>
  );
};

export default CardGridFilter;

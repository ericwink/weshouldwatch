"use client";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container, Button, FormControlLabel, Switch, Box } from "@mui/material";
import { useState } from "react";
import GenreChipFilter from "../GenreChipFilter";
import MediaCardCollection from "./MediaCardCollection";
import { CondensedMedia } from "@/src/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { fetchMediaCollection } from "@/src/lib/supabaseClientHelper";
import { reorganizeGroupMedia } from "@/src/lib/reorganizeGroupMedia";
import WatchedFilterButtons from "../WatchedFilterButtons";
import FilterDrawer from "../FilterDrawer";

export interface GenreFilter {
  genre: string;
  enabled: boolean;
}

interface Props {
  mediaData: CondensedMedia[];
  groupId: string;
  mediaType: "movie" | "tv";
}

const makeGenreArray = (mediaData: CondensedMedia[]) => {
  const genreSet = new Set();
  const genreArray: GenreFilter[] = [];
  for (let media of mediaData) {
    media.genres.forEach(genre => genreSet.add(genre));
  }
  genreSet.forEach(genreName => genreArray.push({ genre: genreName as string, enabled: true }));
  return genreArray;
};

const CardGridFilter = ({ mediaData, groupId, mediaType }: Props) => {
  const [genres, setGenres] = useState(makeGenreArray(mediaData));
  const [watchedFilter, setWatchedFilter] = useState("notWatched");
  const [listView, setListView] = useState(false);

  //set a loading state to spin over the whole screen?
  const {
    data: media,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const results = await fetchMediaCollection(groupId);
      const organizedResults = reorganizeGroupMedia(results);
      return organizedResults[mediaType];
    },
    queryKey: ["groupMedia", { id: groupId }, { type: mediaType }],
    initialData: mediaData,
    // refetchOnWindowFocus: false,
  });

  //return array of enabled genres
  const enabledGenres = genres.filter(genre => genre.enabled === true).map(genre => genre.genre);

  const cardDisplay = media
    .filter(each => each.genres.some(genre => enabledGenres.includes(genre))) //filder media list and return media if any of the genres assigned to it are included in the enabledGenres array.
    .filter(each => {
      if (watchedFilter === "watched") return each.watched;
      if (watchedFilter === "notWatched") return !each.watched;
      return each;
    });

  return (
    <>
      <Grid
        container
        spacing={1}
        mb={1}
        mt={-2}
        justifyContent="center"
      >
        <WatchedFilterButtons
          setWatchedFilter={setWatchedFilter}
          watchedFilter={watchedFilter}
        />
        <FilterDrawer
          genres={genres}
          listView={listView}
          setGenres={setGenres}
          setListView={setListView}
        />
      </Grid>

      <Container maxWidth="md">
        <Grid
          container
          spacing={1}
          mt={2}
          justifyContent="center"
        >
          {cardDisplay.map(card => (
            <MediaCardCollection
              listView={listView}
              media={card}
              key={card.media_id}
              groupId={groupId}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CardGridFilter;

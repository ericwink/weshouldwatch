"use server";

import { z } from "zod";
import axios from "axios";
import { Person, Movie, TV } from "./interface";

type MergedMedia = Person | Movie | TV

type ResultData = {
  page: number;
  results: MergedMedia[]| []
};

const searchTerm = z.string();
type SearchTerm = z.infer<typeof searchTerm>;

const getSearchSuggestions = async (searchTerm: SearchTerm) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const tmdbToken = process.env.API_BEARER_TOKEN
  const url = `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`;

  const {
    data: { results },
  } = await axios<ResultData>({
    method: "GET",
    headers: {
      Authorization:
        `Bearer ${tmdbToken}`,
    },
    url,
  });

  return results;
};

export default getSearchSuggestions;

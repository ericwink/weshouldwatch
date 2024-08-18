"use server";

import { z } from "zod";
import axios from "axios";

type MovieInfo = {
  id: number;
  name: string;
};

type ResultData = {
  page: number;
  results: MovieInfo[] | [];
};

const searchTerm = z.string();
type SearchTerm = z.infer<typeof searchTerm>;

const getSearchSuggestions = async (searchTerm: SearchTerm) => {
  console.log("we are hitting this at least right?");
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/search/keyword?query=${searchTerm}&page=1&?api_key=${tmdbKey}`;

  const {
    data: { results },
  } = await axios<ResultData>({
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjM5NDc3Y2JhMjY1OTZlNDlkNjRmNzRmMDA0YTllNCIsIm5iZiI6MTcyMzkzODQ3Ny41OTYzMTIsInN1YiI6IjYyZmU0MGZhOTBjZjUxMDA3ZjdjNmY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qf3m9C6qDSISRPNm-qVlZOnmPh0nuSfZz410wzFFki4",
    },
    url,
  });

  return results;
};

export default getSearchSuggestions;

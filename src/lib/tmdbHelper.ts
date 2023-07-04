import { TVCredits, MovieCredits } from "./interface";

const tmdbKey = process.env.MOVIE_DB_API;

export const fetchMediaData = async (mediaType: string, id: string, path?: "credits" | "recommendations"): Promise<any> => {
  let url: string;
  if (path) {
    url = `https://api.themoviedb.org/3/${mediaType}/${id}/${path}?api_key=${tmdbKey}&language=en-US`;
  } else {
    url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbKey}&language=en-US`;
  }
  const result = await fetch(url, { next: { revalidate: 28800 } });
  return result.json();
};

export const fetchCredits = async (id: string, path: "movie_credits" | "tv_credits") => {
  const url = `https://api.themoviedb.org/3/person/${id}/${path}?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url, { next: { revalidate: 28800 } });
  if (path === "tv_credits") return result.json() as Promise<TVCredits>;
  return result.json() as Promise<MovieCredits>;
};

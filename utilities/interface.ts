interface Media {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends Media {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TV extends Media {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: (Movie | TV)[];
  known_for_department: string;
  media_type: "person";
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  job?: string;
  character?: string;
}

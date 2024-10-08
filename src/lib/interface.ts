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
  media_type: 'movie'
}

export interface TV extends Media {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
  media_type: 'tv'
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

export interface Collection {
  id: string;
  watched: boolean;
}

export interface GroupInfo {
  id: string;
  userIDs: string[];
  name: string;
  collection: Collection[];
}

export interface TrailerData {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: string;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MediaData {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: [{ id: number; name: string }];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  revenue: number;
  runtime?: number;
  episode_run_time?: number[];
  status: string;
  tagline: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MediaPayload {
  tmdb_id: number;
  title: string;
  poster_path: string;
  genres: string[];
  media_type: string;
}

export interface User {
  email: string;
  id: string;
  is_subscribed: boolean;
  role: string;
  session_id: string;
  stripe_customer: string;
  user_public_profile: {
    profile_pic: string;
    user_name: string;
  };
}

export interface UserAccount {
  created_at: string | null;
  email: string | null;
  id: string;
  is_subscribed: boolean;
  stripe_customer: string | null;
  interval: string | null;
  user_public_profile: {
    profile_pic: string | null;
    user_name: string;
  };
}

export interface TVCredits {
  cast?: TV[];
  crew?: TV[];
  id: number;
}
export interface MovieCredits {
  cast?: Movie[];
  crew?: Movie[];
  id: number;
}

export interface CondensedMedia {
  entry_id: number;
  media_id: number;
  watched: boolean;
  added_reason: string;
  added_by: { user_id: string; user_name: string; profile_pic: string };
  genres: string[];
  media_type: string;
  poster_path: string;
  title: string;
}

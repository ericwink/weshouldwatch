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

export interface mediaData {
  adult: boolean;
  backdrop_path: string;
  // belongs_to_collection: {
  //   id: 573436,
  //   name: 'Spider-Man: Spider-Verse Collection',
  //   poster_path: '/eD4bGQNfmqExIAzKdvX5gDHhI2.jpg',
  //   backdrop_path: '/14F6gMaRjzgsN6EEpiwH87R1I00.jpg'
  // },
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
  // production_companies: [
  //   {
  //     id: 5,
  //     logo_path: '/71BqEFAF4V3qjjMPCpLuyJFB9A.png',
  //     name: 'Columbia Pictures',
  //     origin_country: 'US'
  //   },
  //   {
  //     id: 2251,
  //     logo_path: '/5ilV5mH3gxTEU7p5wjxptHvXkyr.png',
  //     name: 'Sony Pictures Animation',
  //     origin_country: 'US'
  //   },
  //   {
  //     id: 7505,
  //     logo_path: '/837VMM4wOkODc1idNxGT0KQJlej.png',
  //     name: 'Marvel Entertainment',
  //     origin_country: 'US'
  //   },
  //   {
  //     id: 77973,
  //     logo_path: '/9y5lW86HnxKUZOFencYk3TIIRCM.png',
  //     name: 'Lord Miller',
  //     origin_country: 'US'
  //   },
  //   {
  //     id: 84041,
  //     logo_path: '/nw4kyc29QRpNtFbdsBHkRSFavvt.png',
  //     name: 'Pascal Pictures',
  //     origin_country: 'US'
  //   },
  //   {
  //     id: 14439,
  //     logo_path: null,
  //     name: 'Arad Productions',
  //     origin_country: 'US'
  //   }
  // ],
  // production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
  release_date?: string;
  first_air_date?: string;
  revenue: number;
  runtime?: number;
  episode_run_time?: number[];
  // spoken_languages: [
  //   { english_name: 'English', iso_639_1: 'en', name: 'English' },
  //   { english_name: 'Hindi', iso_639_1: 'hi', name: 'हिन्दी' },
  //   { english_name: 'Italian', iso_639_1: 'it', name: 'Italiano' },
  //   { english_name: 'Spanish', iso_639_1: 'es', name: 'Español' }
  // ],
  status: string;
  tagline: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface mediaPayload {
  tmdb_id: number;
  title: string;
  poster_path: string;
  genres: string[];
  media_type: string;
}
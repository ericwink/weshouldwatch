import type { MediaData } from "./interface";
import getPoster from "./getPoster";
import noBackground from "../../public/We Should Watch.png";

const parseMediaData = (mediaData: MediaData) => {
  const poster = getPoster(mediaData.poster_path, "200");
  const title = mediaData.title ?? mediaData.name;
  const backdrop = mediaData.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${mediaData.backdrop_path}` : noBackground;
  const rating = `${Math.floor(mediaData.vote_average * 10)}%`;
  const releaseYear = (mediaData: MediaData): string | undefined => (mediaData.release_date ?? mediaData.first_air_date)?.slice(0, 4);
  const runTime = mediaData.runtime ?? mediaData.episode_run_time![0];
  const genreNames = mediaData.genres.map(each => each.name);

  return { poster, title, backdrop, rating, releaseYear, runTime, genreNames };
};

export default parseMediaData;

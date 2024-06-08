import type { MediaData } from "./interface";
import getPoster from "./getPoster";
import noBackground from "../../public/We Should Watch.png";

interface Args {
  mediaData: MediaData;
  media_type: string;
}

const parseMediaData = (args: Args) => {
  const { mediaData, media_type } = args;
  const poster = getPoster(mediaData.poster_path, "200");
  const title = mediaData.title ?? mediaData.name;
  const backdrop = mediaData.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${mediaData.backdrop_path}` : noBackground;
  const rating = `${Math.floor(mediaData.vote_average * 10)}%`;
  const releaseYear = (mediaData: MediaData): string | undefined => (mediaData.release_date ?? mediaData.first_air_date)?.slice(0, 4);
  const runTime = mediaData.runtime ?? mediaData.episode_run_time![0];
  const genreNames = mediaData.genres.map(each => each.name);

  const mediaInfoPayload = {
    tmdb_id: mediaData.id,
    title: title as string,
    poster_path: mediaData.poster_path,
    genres: genreNames,
    media_type: media_type,
  };

  return { poster, title, backdrop, rating, releaseYear, runTime, genreNames, mediaInfoPayload };
};

export default parseMediaData;

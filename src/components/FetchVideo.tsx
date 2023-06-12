import YouTubePlayer from "./YouTubePlayer/YouTubePlayer";
import { TrailerData } from "@/src/lib/interface";

interface Props {
  media_type: string;
  media_id: string;
}

const fetchVideo = async (mediaType: string, id: string): Promise<TrailerData[]> => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${tmdbKey}&language=en-US`;
  const data = await fetch(url, { next: { revalidate: 28800 } });
  const result = await data.json();
  return result.results.reverse();
};

const findTrailer = async (mediaType: string, id: string): Promise<TrailerData | undefined> => {
  const trailerArray = await fetchVideo(mediaType, id);
  const trailer = trailerArray.find(each => each.type === "Trailer");
  return trailer;
};

const FetchVideo = async ({ media_type, media_id }: Props) => {
  const trailer = await findTrailer(media_type, media_id);

  if (trailer) return <YouTubePlayer youtubeId={trailer?.key} />;
};

export default FetchVideo;

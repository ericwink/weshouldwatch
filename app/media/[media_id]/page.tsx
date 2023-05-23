import getPoster from "@/lib/getPoster";
import Genres from "@/components/Genres/Genres";
import Credits from "@/components/Credits/Credits";
import Recommended from "@/components/Recommneded/Recommended";
import StreamingOptions from "@/components/StreamingOptions/StreamingOptions";
import GroupContainer from "@/components/GroupContainer/GroupContainer";
import { FaPlusCircle } from "react-icons/fa";
import { BsHandThumbsUp, BsClock, BsCalendar } from "react-icons/bs";
import ModalTwo from "@/components/Modal/ModalTwo";
import YouTubePlayer from "@/components/YouTubePlayer/YouTubePlayer";
import { TrailerData } from "@/lib/interface";
import DateTimeRating from "@/components/DateTimeRating/DateTimeRating";

interface Props {
  params: { media_id: string };
  searchParams: { media_type: string };
}

const fetchData = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url, { next: { revalidate: 28800 } });
  return result.json();
};

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

const mediaPage = async ({ params, searchParams }: Props) => {
  const { media_type } = searchParams;
  const { media_id } = params;

  const mediaData = await fetchData(media_type, media_id);
  const trailer = await findTrailer(media_type, media_id);

  const poster = getPoster(mediaData.poster_path, "200");
  const title = mediaData.title ? mediaData.title : mediaData.name;
  const backdrop = `https://image.tmdb.org/t/p/w1280/${mediaData.backdrop_path}`;
  const rating = `${Math.floor(mediaData.vote_average * 10)}%`;
  const genreNames = mediaData.genres.map((each: { id: number; name: string }) => each.name);
  const releaseYear = mediaData.release_date ? mediaData.release_date.slice(0, 4) : mediaData.first_air_date.slice(0, 4);
  const runTime = mediaData.runtime ? mediaData.runtime : mediaData.episode_run_time[0];

  const mediaInfo = {
    mediaId: mediaData.id.toString(),
    title: title,
    poster_path: mediaData.poster_path,
    genres: genreNames,
    mediaType: media_type,
  };

  return (
    <main>
      <div
        className="min-w-full h-80 bg-no-repeat bg-cover flex items-start justify-center"
        style={{ backgroundImage: `url(${backdrop})` }}
      ></div>
      <div className="container max-w-4xl">
        <div className="flex flex-col gap-8 mb-8 -mt-32">
          <div className="flex gap-8 items-end justify-center">
            <img
              src={poster}
              alt={title}
            />

            <ModalTwo
              icon={<FaPlusCircle />}
              text="Add To Group"
              title="Add To Group"
              description="Select from your groups below!"
            >
              <GroupContainer mediaInfo={mediaInfo} />
            </ModalTwo>
          </div>

          <Genres genre_ids={mediaData.genres} />
          <DateTimeRating
            rating={rating}
            releaseYear={releaseYear}
            runTime={runTime}
          />

          <p>{mediaData.overview}</p>

          <YouTubePlayer youtubeId={trailer?.key} />

          <section>
            <h2 className="text-lg">Watch {title}:</h2>

            <div>
              <StreamingOptions
                media_type={media_type}
                id={media_id}
              />
            </div>
          </section>
        </div>
      </div>

      <Credits
        mediaType={media_type}
        id={media_id}
      />
      <Recommended
        mediaType={media_type}
        id={media_id}
      />
    </main>
  );
};

export default mediaPage;

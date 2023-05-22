import getPoster from "@/lib/getPoster";
import Genres from "@/components/Genres/Genres";
import Similar from "@/components/Similar/Similar";
import Credits from "@/components/Credits/Credits";
import Recommended from "@/components/Recommneded/Recommended";
import StreamingOptions from "@/components/StreamingOptions/StreamingOptions";
import GroupContainer from "@/components/GroupContainer/GroupContainer";
import { FaPlusCircle } from "react-icons/fa";
import { BsHandThumbsUp, BsClock, BsCalendar } from "react-icons/bs";
import ModalTwo from "@/components/Modal/ModalTwo";

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

const mediaPage = async ({ params, searchParams }: Props) => {
  const { media_type } = searchParams;
  const { media_id } = params;

  const mediaData = await fetchData(media_type, media_id);

  const poster = getPoster(mediaData.poster_path, "200");
  const title = mediaData.title ? mediaData.title : mediaData.name;
  const backdrop = `https://image.tmdb.org/t/p/w500/${mediaData.backdrop_path}`;
  const rating = `${Math.floor(mediaData.vote_average * 10)}%`;
  const genreNames = mediaData.genres.map((each: { id: number; name: string }) => each.name);

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

          <div className="container flex justify-between">
            <div className="flex gap-1 items-center">
              <BsCalendar />
              <p>{mediaData.release_date.slice(0, 4)}</p>
            </div>

            <div className="flex gap-1 items-center">
              <BsClock />
              <p>{mediaData.runtime} minutes</p>
            </div>
            <div className="flex gap-1 items-center">
              <BsHandThumbsUp />
              <p>{rating}</p>
            </div>
          </div>
          <p>{mediaData.overview}</p>

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
      {/* all similar titles have a 'type' of 'undefined' */}
      {/* <Similar
        mediaType={media_type}
        id={media_id}
      /> */}
    </main>
  );
};

export default mediaPage;

// http://localhost:3000/media/713704?media_type=movie

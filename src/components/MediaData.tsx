import getPoster from "@/src/lib/getPoster";
import Genres from "./Genres";
import StreamingOptions from "@/src/components/StreamingOptions/StreamingOptions";
import DateTimeRating from "@/src/components/DateTimeRating/DateTimeRating";
import Image from "next/image";
import ModalChildren from "./ModalChildren";
import AddMediaContainer from "./AddMediaContainer";
import FetchVideo from "@/src/components/FetchVideo";
import noBackground from "../../public/We Should Watch.png";
import type { mediaData } from "../lib/interface";

interface Props {
  media_id: string;
  media_type: string;
  mediaData: mediaData;
}

const MediaData = ({ mediaData, media_id, media_type }: Props) => {
  const poster = getPoster(mediaData.poster_path, "200");
  const title = mediaData.title ?? mediaData.name;
  const backdrop = mediaData.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${mediaData.backdrop_path}` : noBackground;
  const rating = `${Math.floor(mediaData.vote_average * 10)}%`;
  const releaseDate = mediaData.release_date ?? mediaData.first_air_date;
  const releaseYear = releaseDate!.slice(0, 4);
  const runTime = mediaData.runtime ?? mediaData.episode_run_time![0];
  const genreNames = mediaData.genres.map(each => each.name);

  const mediaInfoPayload = {
    tmdb_id: mediaData.id,
    title: title as string,
    poster_path: mediaData.poster_path,
    genres: genreNames,
    media_type: media_type,
  };

  return (
    <div>
      <div className="min-w-full h-80 relative -z-10">
        <Image
          src={backdrop}
          alt={`backdrop image for ${title}`}
          fill={true}
          objectFit="cover"
        />
      </div>
      <div className="container max-w-4xl">
        <div className="flex flex-col gap-8 mb-8 -mt-32">
          <div className="flex gap-8 items-end justify-center">
            <Image
              src={poster}
              alt={`movie poster for ${title}`}
              height={300}
              width={200}
            />
            <ModalChildren
              button="Add To Group"
              title={`Add ${media_type} to group`}
            >
              {/* @ts-expect-error Server Component */}
              <AddMediaContainer
                media_id={mediaData.id}
                mediaPayload={mediaInfoPayload}
              />
            </ModalChildren>
          </div>

          <Genres genre_ids={mediaData.genres} />

          <DateTimeRating
            rating={rating}
            releaseYear={releaseYear}
            runTime={runTime}
          />

          <p>{mediaData.overview}</p>

          {/* @ts-expect-error Server Component */}
          <FetchVideo
            media_id={media_id}
            media_type={media_type}
          />

          <section>
            <div>
              {/* @ts-expect-error Server Component */}
              <StreamingOptions
                media_type={media_type}
                id={media_id}
                title={title as string}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MediaData;
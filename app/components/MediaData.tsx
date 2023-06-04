import getPoster from "@/lib/getPoster";
import Genres from "./Genres";
import StreamingOptions from "@/app/components/StreamingOptions/StreamingOptions";
import DateTimeRating from "@/app/components/DateTimeRating/DateTimeRating";
import Image from "next/image";
import noBackground from "../../public/We Should Watch.png";
import MUIModal from "@/app/components/MUIModal";
import FetchVideo from "@/app/components/FetchVideo";

interface Props {
  media_id: string;
  media_type: string;
  mediaData: any;
}

const MediaData = ({ mediaData, media_id, media_type }: Props) => {
  const poster = getPoster(mediaData.poster_path, "200");
  const title = mediaData.title ? mediaData.title : mediaData.name;
  const backdrop = mediaData.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${mediaData.backdrop_path}` : noBackground;
  const rating = `${Math.floor(mediaData.vote_average * 10)}%`;
  const releaseYear = mediaData.release_date ? mediaData.release_date.slice(0, 4) : mediaData.first_air_date.slice(0, 4);
  const runTime = mediaData.runtime ? mediaData.runtime : mediaData.episode_run_time[0];

  // const mediaInfo = {
  //   mediaId: mediaData.id.toString(),
  //   title: title,
  //   poster_path: mediaData.poster_path,
  //   genres: genreNames,
  //   mediaType: media_type,
  // };

  return (
    <main>
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
            <MUIModal />
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
                title={title}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default MediaData;

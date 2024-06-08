import Genres from "./Genres";
import StreamingOptions from "@/src/components/StreamingOptions/StreamingOptions";
import DateTimeRating from "@/src/components/DateTimeRating/DateTimeRating";
import Image from "next/image";
import AddMediaModal from "./GroupControl/AddMedia/AddMediaModal";
import AddMediaContainer from "./GroupControl/AddMedia/AddMediaContainer";
import FetchVideo from "@/src/components/FetchVideo";
import type { MediaData } from "../lib/interface";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { parseMediaData } from "../lib";

interface Props {
  media_id: string;
  media_type: string;
  mediaData: MediaData;
}

const MediaData = ({ mediaData, media_id, media_type }: Props) => {
  const { backdrop, genreNames, poster, rating, releaseYear, runTime, title } = parseMediaData(mediaData);

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
          // objectFit="cover"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col gap-8 mb-8 -mt-32">
        <div className="flex gap-8 items-end justify-center">
          <Image
            src={poster}
            alt={`movie poster for ${title}`}
            height={300}
            width={200}
          />
          <AddMediaModal
            iconButton={false}
            title={`Add ${media_type} to group`}
          >
            {/* @ts-expect-error Server Component */}
            <AddMediaContainer
              media_id={mediaData.id}
              mediaPayload={mediaInfoPayload}
            />
          </AddMediaModal>
        </div>

        <Genres genre_ids={mediaData.genres} />

        <DateTimeRating
          rating={rating}
          releaseYear={releaseYear(mediaData)}
          runTime={runTime}
        />

        <Typography>{mediaData.overview}</Typography>

        <Suspense fallback={<p>Loading Video...</p>}>
          {/* @ts-expect-error Server Component */}
          <FetchVideo
            media_id={media_id}
            media_type={media_type}
          />
        </Suspense>

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
  );
};

export default MediaData;

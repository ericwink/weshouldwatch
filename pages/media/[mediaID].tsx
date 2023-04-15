import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Movie, TV } from "../../utilities/interface";
import getPoster from "@/utilities/getPoster";
import Genres from "@/components/Genres/Genres";
import StreamingOptions from "@/components/StreamingOptions/StreamingOptions";
import SearchBar from "@/components/SearchBar/SearchBar";
import Credits from "@/components/Credits/Credits";
import Recommended from "@/components/Recommneded/Recommended";
import Similar from "@/components/Similar/Similar";
import AddToGroupButton from "@/components/AddToGroup/Button/AddToGroupButton";

const MediaDetails = () => {
  const router = useRouter();
  const { mediaID, media_type } = router.query;
  const [mediaData, setMediaData] = useState<Movie | TV | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  const getData = async () => {
    const { data } = await axios.get("/api/tmdb/findByID", { params: { mediaType: media_type, id: mediaID } });
    setMediaData(data);
    console.log(data);
  };

  if (!mediaData) return <h1>Loading...</h1>;

  if (mediaData) {
    const poster = getPoster(mediaData.poster_path, "200");
    const title = mediaData.title ? mediaData.title : mediaData.name;
    const backdrop = `https://image.tmdb.org/t/p/w500/${mediaData.backdrop_path}`;
    const rating = `${Math.floor(mediaData.vote_average * 10)}%`;

    const mediaInfo = {
      id: mediaData.id.toString(),
      title: title,
      poster_path: mediaData.poster_path,
    };

    return (
      <>
        <SearchBar />
        <img
          src={backdrop}
          alt={title}
        />
        {title}
        <img
          src={poster}
          alt={title}
        />
        <Genres
          genre_ids={mediaData.genres}
          type="obj"
        />

        <AddToGroupButton mediaInfo={mediaInfo} />

        <div>
          {mediaData.release_date}
          {mediaData.runtime}
          {rating}
        </div>
        {mediaData.overview}

        <StreamingOptions
          id={mediaID}
          media_type={media_type}
        />

        <Credits
          mediaType={media_type}
          id={mediaID}
        />

        <Recommended
          mediaType={media_type}
          id={mediaID}
        />

        <Similar
          mediaType={media_type}
          id={mediaID}
        />
      </>
    );
  }
};
export default MediaDetails;

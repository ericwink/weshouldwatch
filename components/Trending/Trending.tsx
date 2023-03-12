import { useEffect, useState } from "react";
import axios from "axios";
import PosterButton from "../PosterButton/PosterButton";
import PreviewCard from "../PreviewCard/PreviewCard";
import { MediaProps } from "@/utilities/interface";

interface Props {
  mediaType: "movie" | "person" | "tv";
}

const Trending = ({ mediaType }: Props) => {
  const [data, setData] = useState<MediaProps[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData(mediaType);
  }, []);

  const getData = async (mediaType: string) => {
    const { data } = await axios.get("/api/tmdb/trending", { params: { mediaType: mediaType } });
    setData(data);
    console.log(data);
  };

  if (isLoading) return <h1>loading....</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div>
      {data.map(each => {
        return (
          <PosterButton {...each}>
            <PreviewCard {...each} />
          </PosterButton>
        );
      })}
    </div>
  );
};

export default Trending;

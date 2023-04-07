import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, TV, Person } from "@/utilities/interface";
import Slider from "../Slider/Slider";

interface Props {
  mediaType: "movie" | "person" | "tv";
}

const Trending = ({ mediaType }: Props) => {
  const [data, setData] = useState<Movie[] | TV[] | Person[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const breakpoints = { 0: { slidesPerView: 3, spaceBetween: 10 }, 400: { slidesPerView: 4, spaceBetween: 10 }, 640: { slidesPerView: 6, spaceBetween: 10 }, 900: { slidesPerView: 8, spaceBetween: 10 }, 1200: { slidesPerView: 10, spaceBetween: 10 } };

  useEffect(() => {
    getData(mediaType);
  }, []);

  const getData = async (mediaType: string) => {
    const { data } = await axios.get("/api/tmdb/trending", { params: { mediaType: mediaType } });
    setData(data);
    setLoading(false);
    console.log(data);
  };

  if (isLoading) return <h1>loading....</h1>;
  if (!data) return <h1>No data found</h1>;

  if (data) {
    return (
      <Slider
        mediaType={mediaType}
        data={data}
      />
    );
  }
};

export default Trending;

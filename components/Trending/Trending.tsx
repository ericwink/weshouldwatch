import { useEffect, useState } from "react";
import axios from "axios";
import PosterButton from "../PosterButton/PosterButton";
import ActorLink from "../ActorLink/ActorLink";
import { Movie, TV, Person } from "@/utilities/interface";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

  if (mediaType === "person") {
    return (
      <Swiper breakpoints={breakpoints}>
        {data.map(each => {
          return (
            <SwiperSlide>
              <ActorLink {...each} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  return (
    <Swiper breakpoints={breakpoints}>
      {data.map(each => {
        return (
          <SwiperSlide>
            <PosterButton {...each} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Trending;

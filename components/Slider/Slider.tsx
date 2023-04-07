import PosterButton from "../PosterButton/PosterButton";
import ActorLink from "../ActorLink/ActorLink";
import { Movie, TV, Person } from "@/utilities/interface";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Props {
  mediaType: "movie" | "person" | "tv";
  data: Movie[] | TV[] | Person[];
}

const Slider = ({ mediaType, data }: Props) => {
  const breakpoints = { 0: { slidesPerView: 3, spaceBetween: 10 }, 400: { slidesPerView: 4, spaceBetween: 10 }, 640: { slidesPerView: 6, spaceBetween: 10 }, 900: { slidesPerView: 8, spaceBetween: 10 }, 1200: { slidesPerView: 10, spaceBetween: 10 } };

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

export default Slider;

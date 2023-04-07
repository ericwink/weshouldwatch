import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../Slider/Slider";

interface Props {
  mediaType: "movie" | "tv";
  id: number;
}

const Credits = ({ mediaType, id }: Props) => {
  const [data, setData] = useState();
  const getCredits = async () => {
    const { data } = await axios.get("/api/tmdb/getCredits", { params: { mediaType, id } });
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    getCredits();
  }, []);

  if (!data) return "No Data Found";
  return (
    <>
      <h1>Cast</h1>
      <Slider
        mediaType="person"
        data={data.cast}
      />

      <h1>Production Staff</h1>
      <Slider
        mediaType="person"
        data={data.crew}
      />
    </>
  );
};

export default Credits;

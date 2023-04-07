import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../Slider/Slider";

interface Props {
  mediaType: "movie" | "tv";
  id: string;
}

const Recommended = ({ mediaType, id }: Props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getRecommended = async () => {
    const { data } = await axios.get("/api/tmdb/getRecommended", { params: { mediaType, id } });
    setData(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getRecommended();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <h1>No suggestions found</h1>;
  return (
    <>
      <h1>Recommended Titles</h1>
      <Slider
        mediaType={mediaType}
        data={data}
      />
    </>
  );
};

export default Recommended;

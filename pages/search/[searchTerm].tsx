import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Movie, TV, Person } from "@/utilities/interface";
import PosterButton from "@/components/PosterButton/PosterButton";
import PreviewCard from "@/components/PreviewCard/PreviewCard";
import ActorLink from "@/app/components/ActorLink/ActorLink";
import SearchBar from "@/components/SearchBar/SearchBar";

interface IData {
  movie: Movie[];
  tv: TV[];
  person: Person[];
}

const Results = () => {
  const router = useRouter();
  const { searchTerm } = router.query;
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    fetchResults(searchTerm);
  }, [router.isReady]);

  const fetchResults = async (searchTerm: string) => {
    const { data } = await axios.get("/api/tmdb/search", { params: { searchTerm: searchTerm } });
    const separatedData = separateData(data);
    setData(separatedData);
    setLoading(false);
  };

  const separateData = (data: [Movie | TV | Person]) => {
    const tempData = { movie: [], tv: [], person: [] };
    data.forEach(entry => {
      tempData[entry.media_type].push(entry);
    });
    return tempData;
  };

  if (loading) return <p>Loading...</p>;

  if (data) {
    const mapResults = (mediaType: "movie" | "tv" | "person") => {
      return data[mediaType].map(each => {
        if (mediaType === "person") {
          return <ActorLink {...each} />;
        }
        return (
          <PosterButton {...each}>
            <PreviewCard {...each} />
          </PosterButton>
        );
      });
    };

    return (
      <>
        <SearchBar />
        <p>Movies:</p>
        {mapResults("movie")}
        <p>TV:</p>
        {mapResults("tv")}
        <p>People:</p>
        {mapResults("person")}
      </>
    );
  }
};

export default Results;

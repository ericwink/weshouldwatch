import axios from "axios";
import { useEffect, useState } from "react";
import getPoster from "@/utilities/getPoster";
import { Props, finalStreamData, AvailabilityData, StreamOptions } from "./interfaces";
import styles from "./streamingOptions.module.css";

const StreamingOptions = ({ media_type, id }: Props) => {
  const [streamData, setStreamData] = useState<finalStreamData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("/api/tmdb/findStreaming", { params: { mediaType: media_type, id: id } });
    if (data.results.US) {
      // console.log(data.results.US);
      const reordered = reorderData(data.results.US);
      // console.log({ reordered });
      setStreamData(reordered);
    }
    setLoading(false);
  };

  const reorderData = (obj: AvailabilityData) => {
    const data: StreamOptions = {};
    for (let watchOption in obj) {
      if (watchOption === "link") continue;
      for (let provider of obj[watchOption]) {
        let host = provider.provider_name;
        let logo = provider.logo_path;
        if (!data[host]) data[host] = { logo_path: logo, watchOption: [] };
        data[host].watchOption.push(watchOption);
      }
    }
    const array = [];
    for (let each in data) {
      array.push({ provider: each, ...data[each] });
    }
    return array;
  };

  if (loading) return <h1>Loading...</h1>;
  if (!streamData) return <h1>No Data Found</h1>;

  const streamInfo = streamData.map(entry => {
    return (
      <div
        key={entry.provider}
        className={styles.container}
      >
        <img
          src={getPoster(entry.logo_path, "200")}
          alt={entry.provider}
          className={styles.image}
        />
        <p>{entry.provider}</p>
        <div className={styles.options}>
          {entry.watchOption.map(each => {
            if (each === "flatrate") return <p>Streaming</p>;
            return <p>{each}</p>;
          })}
        </div>
      </div>
    );
  });

  return <>{streamInfo}</>;
};

export default StreamingOptions;

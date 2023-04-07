import axios from "axios";
import { useEffect, useState } from "react";
import getPoster from "@/utilities/getPoster";
import { Props, AvailabilityData, StreamOptions } from "./interfaces";
import styles from "./streamingOptions.module.css";

const StreamingOptions = ({ media_type, id }: Props) => {
  const [streamData, setStreamData] = useState<StreamOptions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("/api/tmdb/findStreaming", { params: { mediaType: media_type, id: id } });
    if (data.results.US) {
      console.log(data.results.US);
      const reordered = reorderData(data.results.US);
      console.log({ reordered });
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
    return data;
  };

  if (loading) return <h1>Loading...</h1>;
  if (!streamData) return <h1>No Data Found</h1>;

  const streamInfo = (provider: string) => {
    const providerData = streamData[provider];
    return (
      <div
        key={provider}
        className={styles.container}
      >
        <img
          src={getPoster(providerData.logo_path, "200")}
          alt={provider}
          className={styles.image}
        />
        <p>{provider}</p>
        <div className={styles.options}>
          {providerData.watchOption.map(option => {
            return buyPurchaseRent(option);
          })}
        </div>
      </div>
    );
  };

  const buyPurchaseRent = (option: "buy" | "rent" | "flatrate") => {
    const map = { buy: "Buy", rent: "Rent", flatrate: "Streaming" };
    if (map[option]) return <p>{map[option]}</p>;
    return <p>{option}</p>;
  };

  return (
    <>
      {Object.keys(streamData).map(provider => {
        return streamInfo(provider);
      })}
    </>
  );
};

export default StreamingOptions;

import getPoster from "@/utilities/getPoster";
import { Props, AvailabilityData, StreamOptions } from "./interfaces";
import styles from "./streamingOptions.module.css";

const fetchStreamingOptions = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${tmdbKey}`;
  const results = await fetch(url);
  const unorderedStreamingOptions = await results.json();
  const streamingOptions = reorderData(unorderedStreamingOptions.results.US);
  return streamingOptions;
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

const StreamingOptions = async ({ media_type, id }: Props) => {
  const streamingOptions = await fetchStreamingOptions(media_type, id);

  if (!streamingOptions) return <h1>No Streaming Options Found</h1>;

  const streamInfo = (provider: string) => {
    const providerData = streamingOptions[provider];
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
      {Object.keys(streamingOptions).map(provider => {
        return streamInfo(provider);
      })}
    </>
  );
};

export default StreamingOptions;

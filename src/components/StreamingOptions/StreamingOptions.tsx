import getPoster from "@/src/lib/getPoster";
import { Props, AvailabilityData, StreamOptions } from "./interfaces";
import styles from "./streamingOptions.module.css";
import Image from "next/image";

const fetchStreamingOptions = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${tmdbKey}`;
  const results = await fetch(url, { next: { revalidate: 28800 } });
  const unorderedStreamingOptions = await results.json();
  if (!unorderedStreamingOptions.results.US) return null;
  const streamingOptions = reorderData(unorderedStreamingOptions.results.US);
  return streamingOptions;
};

const reorderData = (obj: AvailabilityData) => {
  const data: StreamOptions = {};
  for (let watchOption in obj) {
    if (watchOption === "link") continue;
    for (let provider of obj[watchOption as keyof AvailabilityData]) {
      if (typeof provider === "string") continue; // Skip if it's a string

      let host = provider.provider_name;
      let logo = provider.logo_path;
      if (!data[host]) data[host] = { logo_path: logo, watchOption: [] };
      data[host].watchOption.push(watchOption);
    }
  }
  return data;
};

const StreamingOptions = async ({ media_type, id, title }: Props) => {
  const streamingOptions = await fetchStreamingOptions(media_type, id);

  if (!streamingOptions) return;

  const streamInfo = (provider: string) => {
    const providerData = streamingOptions[provider];
    return (
      <div
        key={provider}
        className={styles.container}
      >
        <Image
          src={getPoster(providerData.logo_path, "200")}
          alt={`logo for ${provider}`}
          height={200}
          width={200}
          className="w-10"
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

  const buyPurchaseRent = (option: string) => {
    const map: { [key: string]: string } = { buy: "Buy", rent: "Rent", flatrate: "Streaming" };
    if (map[option]) return <p>{map[option]}</p>;
    return <p>{option}</p>;
  };

  return (
    <>
      <h2 className="text-lg">Watch {title}:</h2>

      {Object.keys(streamingOptions).map(provider => {
        return streamInfo(provider);
      })}
    </>
  );
};

export default StreamingOptions;

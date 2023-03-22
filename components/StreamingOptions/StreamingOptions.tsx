import axios from "axios";
import { useState } from "react";

interface Props {
  media_type: string;
  id: number;
}

interface ProviderData {
  logo_path: string;
  provider_name: string;
}

interface AvailabilityData {
  rent: ProviderData[];
  buy: ProviderData[];
  flatrate: ProviderData[];
  link: string;
}

interface StreamOptions {
  [provider_name: string]: { logo_path: string; watchOption: string[] };
}

const StreamingOptions = ({ media_type, id }: Props) => {
  const [data, setData] = useState(null);

  const getData = async () => {
    const { data } = await axios.get("/api/tmdb/findStreaming", { params: { mediaType: media_type, id: id } });
    if (data.results.us) setData(data.results.us);
    console.log(data.results.US);
    reorderData(data.results.US);
  };

  getData();

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
    console.log(data);
  };

  return <h1>Streaming Options</h1>;
};

export default StreamingOptions;

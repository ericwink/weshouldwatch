import { Typography } from "@mui/material";
import { countryCodes } from "./countryCodes";
import SOClient from "./SOClient";

const fetchStreamingOptions = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${tmdbKey}`;
  const results = await fetch(url, { next: { revalidate: 28800 } });
  const unorderedStreamingOptions = await results.json();
  return unorderedStreamingOptions.results;
};

const createCountrySelection = (streamingData: { [code: string]: {} }[]) => {
  const codeList = Object.keys(streamingData).map(each => {
    if (countryCodes[each]) return { code: each, name: countryCodes[each] };
    return { code: each, name: each };
  });
  return codeList;
};

export interface Props {
  media_type: string;
  id: string;
  title: string;
}

const StreamingOptions = async ({ media_type, id, title }: Props) => {
  const streamingOptions = await fetchStreamingOptions(media_type, id);

  if (Object.keys(streamingOptions).length === 0) return <Typography>Not available for online streaming</Typography>;

  return (
    <div>
      <SOClient
        codeList={createCountrySelection(streamingOptions)}
        streamingData={streamingOptions}
      />
    </div>
  );
};

export default StreamingOptions;

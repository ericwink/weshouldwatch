import getPoster from "@/src/lib/getPoster";
import { Props, AvailabilityData, StreamOptions } from "./interfaces";
import Image from "next/image";
import { Paper, Typography, Divider, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

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
    if (watchOption === "link") continue; //skip over the link entry since we aren't using it
    for (let provider of obj[watchOption as keyof AvailabilityData]) {
      if (typeof provider === "string") continue; //added to skip over some extraneous data

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

  if (!streamingOptions) return <Typography>Not available for online streaming</Typography>;

  const streamInfo = (provider: string) => {
    const providerData = streamingOptions[provider];
    return (
      <Paper>
        <Box sx={{ display: "grid", alignItems: "center", gridTemplateColumns: "1fr 4fr 3fr" }}>
          <Image
            src={getPoster(providerData.logo_path, "200")}
            alt={`logo for ${provider}`}
            height={200}
            width={200}
            className="w-10"
          />
          <Box>
            <Typography>{provider}</Typography>
          </Box>
          <Grid
            container
            gap={1}
            justifyContent="right"
            mr={0.5}
          >
            {providerData.watchOption.map((option, index) => {
              return (
                <>
                  {buyPurchaseRent(option)}
                  {index < providerData.watchOption.length - 1 ? (
                    <Divider
                      orientation="vertical"
                      flexItem
                    />
                  ) : null}
                </>
              );
            })}
          </Grid>
        </Box>
      </Paper>
    );
  };

  const buyPurchaseRent = (option: string) => {
    const map: { [key: string]: string } = { buy: "Buy", rent: "Rent", flatrate: "Streaming" };
    if (map[option]) return <Typography>{map[option]}</Typography>;
    return <Typography>{option}</Typography>;
  };

  return (
    <div>
      <Typography variant="h5">Watch {title}:</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {Object.keys(streamingOptions).map(provider => {
          return streamInfo(provider);
        })}
      </Box>
    </div>
  );
};

export default StreamingOptions;

"use client";

import getPoster from "@/src/lib/getPoster";
import { Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import { ExtendedStreamOptions } from "./interfaces";

interface Props {
  streamOptions: ExtendedStreamOptions[];
}

const SOChart = ({ streamOptions }: Props) => {
  const buyPurchaseRent = (option: string) => {
    const map: { [key: string]: string } = { buy: "Buy", rent: "Rent", flatrate: "Streaming" };
    if (map[option]) return <Typography>{map[option]}</Typography>;
    return <Typography>{option}</Typography>;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {streamOptions.map((provider, index) => (
        <>
          <Box
            key={provider.provider}
            sx={{ display: "grid", alignItems: "center", gridTemplateColumns: "1fr 4fr 3fr" }}
          >
            <Image
              src={getPoster(provider.logo_path, "200")}
              alt={`logo for ${provider}`}
              height={200}
              width={200}
              className="w-10"
            />
            <Box>
              <Typography>{provider.provider}</Typography>
            </Box>
            <Grid
              container
              gap={1}
              justifyContent="right"
              mr={0.5}
            >
              {provider.watchOptions.map((option, index) => {
                return (
                  <>
                    {buyPurchaseRent(option)}
                    {index < provider.watchOptions.length - 1 ? (
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
          <Divider />
        </>
      ))}
      <Typography
        variant="caption"
        mt={1}
      >
        The above data is provided by <a href="https://www.justwatch.com/">JustWatch</a>
      </Typography>
    </Box>
  );
};

export default SOChart;

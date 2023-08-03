"use client";
import { useState } from "react";
import SOChart from "./SOChart";
import SOCountrySelect, { CountryCode } from "./SOCountrySelect";
import { AvailabilityData, StreamOptions, ExtendedStreamOptions } from "./interfaces";
import { Typography, Box, Paper } from "@mui/material";

interface Props {
  codeList: CountryCode[];
  streamingData: any;
  title: string;
}

export const reorderData = (obj: AvailabilityData) => {
  const data: StreamOptions = {};
  const dataArray: ExtendedStreamOptions[] = [];
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
  for (let provider in data) {
    dataArray.push({ provider: provider, logo_path: data[provider].logo_path, watchOptions: data[provider].watchOption });
  }
  return dataArray;
};

const SOClient = ({ codeList, streamingData, title }: Props) => {
  const initialCountry = streamingData.US ? "US" : Object.keys(streamingData)[0];
  const [country, setCountry] = useState(initialCountry);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
        <Typography variant="h5">Where to watch:</Typography>
        <SOCountrySelect
          codeList={codeList}
          country={country}
          setCountry={setCountry}
        />
      </Box>
      <SOChart streamOptions={reorderData(streamingData[country])} />
    </>
  );
};

export default SOClient;

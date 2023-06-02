"use client";

import MediaCardMUI from "@/components/MediaCardMUI";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container } from "@mui/material";
import PeopleCard from "./PeopleCard";

const TrendingGrid = ({ data }: { data: any }) => {
  return (
    <>
      <Container>
        <h1>MUI PAGE</h1>
        <Grid
          container
          spacing={1}
          justifyContent="center"
        >
          {data.map(each => {
            if (!each.adult) {
              if (each.media_type === "person") {
                return <PeopleCard person={each} />;
              } else {
                return <MediaCardMUI media={each} />;
              }
            }
          })}
        </Grid>
      </Container>
    </>
  );
};

export default TrendingGrid;

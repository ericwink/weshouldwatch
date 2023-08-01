"use client";

import TabDisplay from "@/src/components/TabDisplay";
import CardGrid from "../components/Cards/CardGrid";
import CardSkeleton from "@/src/components/Cards/CardSkeleton";

const mainPageLoading = () => {
  const cardSkeleton = Array.from({ length: 20 }, (_, i) => <CardSkeleton key={i} />);

  return (
    <>
      <TabDisplay tabNames={["Trending Movies", "Trending TV", "Trending People"]}>
        <CardGrid>{cardSkeleton}</CardGrid>
        <CardGrid>{cardSkeleton}</CardGrid>
        <CardGrid>{cardSkeleton}</CardGrid>
      </TabDisplay>
    </>
  );
};

export default mainPageLoading;

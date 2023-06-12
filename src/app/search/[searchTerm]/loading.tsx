"use client";

import TabDisplay from "@/src/components/TabDisplay";
import CardGrid from "@/src/components/CardGrid";
import CardSkeleton from "@/src/components/CardSkeleton";

const mainPageLoading = () => {
  const cardSkeleton = Array.from({ length: 12 }, (_, i) => <CardSkeleton key={i} />);

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

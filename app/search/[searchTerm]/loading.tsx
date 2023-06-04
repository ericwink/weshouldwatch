"use client";

import TabDisplay from "@/components/TabDisplay";
import CardGrid from "@/components/CardGrid";
import CardSkeleton from "@/components/CardSkeleton";

const mainPageLoading = () => {
  const cardSkeleton = Array.from({ length: 12 }, (_, i) => <CardSkeleton />);

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

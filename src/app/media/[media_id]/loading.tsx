"use client";

import TabDisplay from "@/src/components/TabDisplay";
import CardGrid from "@/src/components/CardGrid";
import CardSkeleton from "@/src/components/CardSkeleton";
import MediaSkeleton from "@/src/components/MediaSkeleton";

const mainPageLoading = () => {
  const cardSkeleton = Array.from({ length: 12 }, (_, i) => <CardSkeleton key={i} />);
  const mediaSkeleton = <MediaSkeleton />;

  return (
    <>
      <TabDisplay tabNames={["Media Data", "Cast", "Crew", "Recommended"]}>
        <CardGrid>{mediaSkeleton}</CardGrid>
        <CardGrid>{cardSkeleton}</CardGrid>
        <CardGrid>{cardSkeleton}</CardGrid>
        <CardGrid>{cardSkeleton}</CardGrid>
      </TabDisplay>
    </>
  );
};

export default mainPageLoading;

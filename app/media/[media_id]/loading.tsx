"use client";

import TabDisplay from "@/app/components/TabDisplay";
import CardGrid from "@/app/components/CardGrid";
import CardSkeleton from "@/app/components/CardSkeleton";
import MediaSkeleton from "@/app/components/MediaSkeleton";

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

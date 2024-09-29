import { Skeleton } from "@mui/material";

const MediaLoader = () => {
  const cardSkeleton = Array.from({ length: 10 }, (_, i) => (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={180}
      width={135}
      key={i}
    />
  ));

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      {cardSkeleton}
    </div>
  );
};

export default MediaLoader;

import { Skeleton, Container } from "@mui/material";

const MediaSkeleton = () => {
  return (
    <Container>
      <div className="min-w-full h-80 relative -z-10">
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={320}
          width="100%"
        />
      </div>
      <div className="container max-w-4xl">
        <div className="flex flex-col gap-8 mb-8 -mt-32">
          <div className="flex gap-8 items-end justify-center">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={300}
              width={200}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={50}
              width={100}
            />
          </div>
          <div className="flex flex-col gap-8 items-center justify-center">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={50}
              width={350}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={50}
              width={350}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={300}
              width={350}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MediaSkeleton;

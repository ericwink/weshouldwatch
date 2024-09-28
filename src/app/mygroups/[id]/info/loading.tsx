import { Typography, Avatar, Skeleton } from "@mui/material";

const MemberSkeleton = () => {
  return (
    <div className="flex gap-2 items-center">
      <Skeleton variant="circular" height={50} width={50} animation="wave" />
      <Skeleton
        variant="rectangular"
        height={25}
        width="100%"
        animation="wave"
      />
    </div>
  );
};

const InfoLoading = async () => {
  return (
    <div className="flex flex-col justify-center gap-3 min-w-64">
      <Typography variant="h4">Group Members:</Typography>
      <MemberSkeleton />
      <MemberSkeleton />
      <MemberSkeleton />
      <Skeleton
        variant="rectangular"
        height={25}
        width="100%"
        animation="wave"
      />
    </div>
  );
};

export default InfoLoading;

import { Box, Avatar, Typography } from "@mui/material";

interface Props {
  user: {
    user_name: string;
    profile_pic: string | null;
  } | null;
  added_reason: string | null | undefined;
}

const GroupMediaCardMenuHeader = ({ user, added_reason }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
      mt={2}
      mb={2}
    >
      <Avatar
        src={user?.profile_pic ?? ""}
        alt={user?.user_name ?? "Unknown User"}
        sx={{ height: 100, width: 100 }}
      />
      <Typography variant="caption">Added By User Name</Typography>
      {added_reason && (
        <Typography
          textAlign="center"
          variant="h6"
        >{`"${added_reason}"`}</Typography>
      )}
    </Box>
  );
};

export default GroupMediaCardMenuHeader;

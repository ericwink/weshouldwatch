import { Typography } from "@mui/material";
import Warning from "@mui/icons-material/Warning";

const AccessDeniedPage = () => {
  return (
    <section className="w-full pt-4 flex flex-col justify-center items-center">
      <Warning fontSize="large" />
      <Typography variant="h4">
        You are not permitted to access this group.
      </Typography>
      <div>
        <Typography>Potential solutions:</Typography>
        <Typography>- Buy premium</Typography>
        <Typography>- Make this group your primary group</Typography>
        <Typography>- Request to be invited by a group member</Typography>
      </div>
    </section>
  );
};

export default AccessDeniedPage;

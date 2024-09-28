import { Typography } from "@mui/material";
import Warning from "@mui/icons-material/Warning";

const AccessDeniedPage = () => {
  return (
    <section className="w-full pt-4 flex flex-col justify-center items-center">
      <Warning fontSize="large" />
      <Typography variant="h4">
        Either buy premium, or change this group to your primary group
      </Typography>
    </section>
  );
};

export default AccessDeniedPage;

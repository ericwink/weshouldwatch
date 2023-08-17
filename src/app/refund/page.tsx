import { Container, Typography } from "@mui/material";

const RefundPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, pb: 2 }}
    >
      <Typography variant="h3">Refund Policy</Typography>
      <Typography>Last updated: August 17, 2023</Typography>
      <Typography>
        At WeShouldWatch.app, we are committed to providing a collaborative experience for you and your friends, family, loved ones, etc to search for, identify details for, and collaboratively save media data to groups for the purpose of tracking
        content to watch together.
      </Typography>
      <Typography>
        Due to the high costs and effort involved building and maintaining this application, we have made the decision at this time not to offer refunds once a subscription has been purchased. A subscription may be canceled at any time, and once
        expired a renewal will not be automatically processed. We realize this may not be the ideal scenario for everyone, but this policy helps us to maintain a fair and sustainable service for all of our valued users.
      </Typography>
      <Typography>Your understanding and support mean a lot to us as we continue to improve and enhance our service.</Typography>
    </Container>
  );
};

export default RefundPage;

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
        At WeShouldWatch.app, we are committed to providing a collaborative experience for you and your friends, family, loved ones, etc to search for, identify details for, and collaboratively save media to groups for the purpose of tracking content
        to watch and enjoy together.
      </Typography>
      <Typography>
        Due to the costs and effort involved building and maintaining this application, we have made the decision at this time not to offer refunds once a subscription has been purchased. A cancellation may be processed at any time during the
        subscription period through your Account page. The subscription will still be valid and benefits active through the expiration date, and once expired a renewal will not be automatically processed.
      </Typography>
      <Typography>
        Please be aware that if your subscription is cancelled at any time, your service will drop back down to the Free Tier level at the end of the term period. At that time, you will be allowed access to only ONE Created Group and ONE Joined
        Group. If you have addiitonal groups of each type, a Lock Icon will be displayed next to the group's name. You will be permitted once every 30 days to adjust which Created Group and which Joined Group you would like to have access to.
      </Typography>
      <Typography>Your understanding and support mean a lot to us as we continue to improve and enhance our service.</Typography>
    </Container>
  );
};

export default RefundPage;

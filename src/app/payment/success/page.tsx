import { Typography, Container, Link } from "@mui/material";

const paymentSuccessPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, pb: 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
      >
        Thank you for subscribing!
      </Typography>
      <Typography>
        As a Preimum member of <b>We Should Watch</b>, you have access to...
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Create unlimited groups!
      </Typography>
      <Typography>Need extra groups to further categorize your movies and shows? Make as many as you want!</Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Join unlimited groups!
      </Typography>
      <Typography>Sharing movies and shows with several people that have their own groups? Join them all!</Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Journal/Live Chat!
      </Typography>
      <Typography>Want to write your thoughts about the media you've seen? Want to have a space to chat about the movie with friends live as you're watching it? Now you've got it! </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        And one more thing!
      </Typography>
      <Typography>
        Since you signed up during the beta, if you have a feature suggestion please send it to <Link href="mailto:weshouldwatchmailer@gmail.com">WeShouldWatchMailer@gmail.com</Link>
      </Typography>

      <Typography>
        Check out your <Link href="/account">account</Link> for details on your subscription
      </Typography>
    </Container>
  );
};

export default paymentSuccessPage;

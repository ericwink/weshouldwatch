import { Container, Typography } from "@mui/material";

const CookiesPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, pb: 2 }}
    >
      <Typography variant="h3">Cookies</Typography>
      <Typography>
        Cookies are small text files that are stored on your device when you visit a website. Cookies can be used to provide a better user experience, analyze how users interact with our website, and to personalize content and ads.
      </Typography>
      <Typography>Cookies we use</Typography>
      <Typography>We use cookies to provide a better experience on our website and to provide the applicable services. Here are the cookies we use:</Typography>
      <Typography>Stripe (required)</Typography>
      <Typography>
        We use stripe as our payment gateway which allows websites to process online payments securely and easily. When a user makes a payment on our website using Stripe, their payment information (such as their credit card details) needs to be
        stored temporarily while the payment is being processed. Please review the https://stripe.com/cookie-settings settings to configure your stripe cookies.
      </Typography>
      <Typography>
        {`To enable this, Stripe uses cookies to store information about the user's session, such as their session ID and the status of their payment. These cookies are necessary for the payment process to work properly, and they are stored on the
        user's browser until the payment process is complete.`}
      </Typography>
      <Typography>
        {`In addition to payment-related cookies, Stripe may also use other cookies on your website to improve performance, analyze how users interact with the website, and provide relevant advertising. However, these additional cookies are optional
        and you can choose to disable them if you prefer. Stripe's use of cookies is subject to their own privacy policy, which you should review if you have any specific concerns.`}
      </Typography>
      <Typography>Authentication (required)</Typography>
      <Typography>
        We use Supabase Auth to authenticate users on our application, which is a library that allows users to authenticate using various third party services, such as google, which makes it easy to sign up and start using our application.
      </Typography>
    </Container>
  );
};

export default CookiesPage;

import { Container, Typography, Link } from "@mui/material";

const CookiesPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, pb: 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
      >
        Cookie policy
      </Typography>
      <Typography>
        This cookie policy (“Policy”) describes what cookies are and how they’re being used by the weshouldwatch.app website (“Website” or “Service”) and any of its related products and services (collectively, “Services”). This Policy is a legally
        binding agreement between you (“User”, “you” or “your”) and this Website operator (“Operator”, “we”, “us” or “our”). If you are entering into this Policy on behalf of a business or other legal entity, you represent that you have the authority
        to bind such entity to this Policy, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this Policy, you must not accept this Policy and may
        not access and use the Website and Services. You should read this Policy so you can understand the types of cookies we use, the information we collect using cookies and how that information is used. It also describes the choices available to
        you regarding accepting or declining the use of cookies. For further information on how we use, store and keep your personal data secure, see our <Link href="/privacy">privacy policy</Link>.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        What are cookies?
      </Typography>
      <Typography>
        Cookies are small pieces of data stored in text files that are saved on your computer or other devices when websites are loaded in a browser. They are widely used to remember you and your preferences, either for a single visit (through a
        “session cookie”) or for multiple repeat visits (using a “persistent cookie”).
      </Typography>
      <Typography>Session cookies are temporary cookies that are used during the course of your visit to the Website, and they expire when you close the web browser.</Typography>
      <Typography>
        Persistent cookies are used to remember your preferences within our Website and remain on your desktop or mobile device even after you close your browser or restart your computer. They ensure a consistent and efficient experience for you
        while visiting the Website and Services.
      </Typography>
      <Typography>
        Cookies may be set by the Website (“first-party cookies”), or by third parties, such as those who serve content or provide advertising or analytics services on the Website (“third party cookies”). These third parties can recognize you when
        you visit our website and also when you visit certain other websites.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        What type of cookies do we use?
      </Typography>
      <Typography
        variant="h6"
        component="h3"
      >
        Necessary cookies
      </Typography>
      <Typography>
        Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our Website and using its features. For example, these cookies let us recognize that you have created an account and have logged into
        that account to access the content.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Do we use web beacons or tracking pixels?
      </Typography>
      <Typography>Our emails may contain a “web beacon” (or “tracking pixel”) to tell us whether our emails are opened and verify any clicks through to links or advertisements within the email.</Typography>
      <Typography>We may use this information for purposes including determining which of our emails are more interesting to users and to query whether users who do not open our emails wish to continue receiving them.</Typography>
      <Typography>The pixel will be deleted when you delete the email. If you do not wish the pixel to be downloaded to your device, you should read the email in plain text view or with images disabled.</Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        What are your cookie options?
      </Typography>
      <Typography>
        If you don’t like the idea of cookies or certain types of cookies, you can change your browser’s settings to delete cookies that have already been set and to not accept new cookies. Visit{" "}
        <Link
          href="https://www.internetcookies.com/"
          target="_blank"
          rel="noopener"
        >
          internetcookies.com
        </Link>{" "}
        to learn more about how to do this.
      </Typography>
      <Typography>Please note, however, that if you delete cookies or do not accept them, you might not be able to use all of the features the Website and Services offer.</Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Changes and amendments
      </Typography>
      <Typography>
        We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways
        at our discretion, such as through the contact information you have provided.
      </Typography>
      <Typography>
        An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other
        act specified at that time) will constitute your consent to those changes.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Acceptance of this policy
      </Typography>
      <Typography>
        You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are
        not authorized to access or use the Website and Services.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Contacting us
      </Typography>
      <Typography>If you have any questions, concerns, or complaints regarding this Policy or the use of cookies, we encourage you to contact us using the details below:</Typography>
      <Typography>WeShouldWatchMailer@gmail.com</Typography>
      <Typography>This document was last updated on August 18, 2023</Typography>
    </Container>
  );
};

export default CookiesPage;

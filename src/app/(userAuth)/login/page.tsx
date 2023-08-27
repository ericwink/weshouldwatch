import LogInSignUp from "../../../components/LogInSignUp";
import { Typography, Container, Button } from "@mui/material";
import TermsBlock from "@/src/components/TermsBlock";
import Link from "next/link";

const loginPage = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center", p: 2, minHeight: "calc(100vh - 65px)", justifyContent: "center" }}>
      <Typography
        variant="h3"
        component="h2"
        mb={1}
        textAlign="center"
      >
        Log In
      </Typography>

      <LogInSignUp type="login" />

      <Typography textAlign="center">
        Need an account?
        <Button>
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
      </Typography>

      <TermsBlock />
    </Container>
  );
};

export default loginPage;

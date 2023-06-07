"use client";

import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { useUser } from "../context/user";
import Link from "next/link";

const LogInSignUp = ({ type }: { type: "login" | "signup" }) => {
  const { gmail, noPasswordLogin } = useUser();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const header = type === "login" ? "Log In" : "Create An Account";

  const signUpRedirect = (
    <Typography>
      Need an account?{" "}
      <Button>
        <Link href={"/signup"}>Sign Up</Link>
      </Button>
    </Typography>
  );
  const loginRedirect = (
    <Typography>
      Already have an account?{" "}
      <Button>
        <Link href={"/login"}>Log In</Link>
      </Button>
    </Typography>
  );

  const handleClick = () => {
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      noPasswordLogin(email);
      setSubmitted(true);
    } else {
      setError(true);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false);
    setEmail(e.target.value);
  };

  const loginForm = (
    <>
      <TextField
        label="email"
        variant="outlined"
        type="email"
        error={error}
        helperText={error && "Enter a valid email"}
        onChange={handleInput}
        fullWidth
      />

      <Button
        variant="contained"
        onClick={handleClick}
        fullWidth
      >
        {`${type} with email`}
      </Button>
      <Button
        variant="contained"
        onClick={gmail}
        fullWidth
      >
        {`${type} with Google`}
      </Button>
    </>
  );

  const emailSent = <Typography>Check your email!</Typography>;

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        justifyContent="center"
        alignItems="center"
        width="300px"
        height={"90vh"}
      >
        <Typography
          variant="h3"
          component="h2"
          mb={1}
          textAlign="center"
        >
          {header}
        </Typography>
        {submitted ? emailSent : loginForm}
        {type === "login" ? signUpRedirect : loginRedirect}
      </Box>
    </Container>
  );
};

export default LogInSignUp;

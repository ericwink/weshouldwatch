"use client";

import { TextField, Button, Box, Typography } from "@mui/material";
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
    <Typography textAlign="center">
      Need an account?{" "}
      <Button>
        <Link href={"/signup"}>Sign Up</Link>
      </Button>
    </Typography>
  );
  const loginRedirect = (
    <Typography textAlign="center">
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
        color="error"
      >
        {`${type} with Google`}
      </Button>
    </>
  );

  const emailSent = <Typography>Check your email!</Typography>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      p={1}
      justifyContent="center"
      alignContent="center"
      width="300px"
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
  );
};

export default LogInSignUp;

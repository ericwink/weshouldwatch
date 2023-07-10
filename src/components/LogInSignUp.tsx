"use client";

import { TextField, Button, Box, Typography, Divider, CircularProgress } from "@mui/material";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { signup, login, gmailLogin } from "../lib/supabaseClientHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LogInSignUp = ({ type }: { type: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const disabled = !password || !email;
  const router = useRouter();
  const queryClient = useQueryClient();

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
  const redirect = type === "login" ? signUpRedirect : loginRedirect;

  const { mutate: handleLogin } = useMutation({
    mutationFn: async () => await login(email, password),
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["userAccount"] });
      // router.back();
    },
    onSettled: () => {
      router.push("/");
      // setTimeout(() => {
      //   router.refresh();
      // }, 500);
    },
    onError: (error: any) => {
      toast.error(`${error.message}`, { theme: "colored" });
    },
  });

  const { mutate: handleSignup } = useMutation({
    mutationFn: async () => {
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail) {
        setError(true);
        throw new Error("Please enter a valid email address");
      }
      await signup(email, password);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast.error(`${error.message}`, { theme: "colored" });
    },
  });

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
      <TextField
        label="password"
        variant="outlined"
        type="password"
        onChange={e => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        onClick={() => (type === "signup" ? handleSignup() : handleLogin())}
        disabled={disabled || isLoading}
        fullWidth
      >
        {isLoading ? <CircularProgress /> : `${type}`}
      </Button>
      <Divider variant="middle" />
      <Button
        variant="contained"
        onClick={() => gmailLogin()}
        fullWidth
        color="error"
      >
        {`${type} with Google`}
      </Button>
    </>
  );

  const emailSent = <Typography textAlign={"center"}>Check your email to verify your account!</Typography>;

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
      {!submitted && redirect}
    </Box>
  );
};

export default LogInSignUp;

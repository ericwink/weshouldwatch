"use client";

import { TextField, Button, Box, Typography, Divider, CircularProgress } from "@mui/material";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { signup, login, gmailLogin } from "../lib/supabaseClientHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../lib/store";

interface Props {
  type: "login" | "signup";
}

const LogInSignUp = ({ type }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const disabled = !password || !email;
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const authRedirect = (
    <Typography textAlign="center">
      {type === "login" && `Need an account? `}
      {type === "signup" && `Already have an account? `}
      <Button>
        {type === "login" && <Link href={"/signup"}>Sign Up</Link>}
        {type === "signup" && <Link href={"/login"}>Log In</Link>}
      </Button>
    </Typography>
  );

  const { mutate: handleLogin, isLoading: loading } = useMutation({
    mutationFn: async () => await login(email, password),
    onSuccess: data => {
      router.push("/");
      setUser(data);
    },
    onError: (error: any) => {
      toast.error(`${error.message}`, { theme: "colored" });
    },
  });

  const { mutate: handleSignup, isLoading } = useMutation({
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
        disabled={disabled || isLoading || loading}
        fullWidth
      >
        {isLoading || loading ? <CircularProgress /> : `${type}`}
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
        {type === "login" ? "Log In" : "Create An Account"}
      </Typography>
      {submitted ? emailSent : loginForm}
      {!submitted && authRedirect}
    </Box>
  );
};

export default LogInSignUp;

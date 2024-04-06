"use client";

import { TextField, Button, Box, Typography, Divider, CircularProgress, InputAdornment } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { signup, login, gmailLogin } from "../lib/supabaseClientHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../lib/store";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { z } from "zod";

interface Props {
  type: "login" | "signup";
}

const LogInSignUp = ({ type }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const disabled = !password || !email;
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);

  const mySchema = z.string().email({ message: "Please enter a valid email address" });

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
      mySchema.parse(email);
      await signup(email, password);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: any | z.ZodError) => {
      if (error instanceof z.ZodError) {
        toast.error(`${error.issues[0].message}`, { theme: "colored" });
      } else {
        toast.error(`${error.message}`, { theme: "colored" });
      }
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
        type={passwordVisible ? "text" : "password"}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setPasswordVisible(prev => !prev)}
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </InputAdornment>
          ),
        }}
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
      ></Typography>
      {submitted ? emailSent : loginForm}
    </Box>
  );
};

export default LogInSignUp;

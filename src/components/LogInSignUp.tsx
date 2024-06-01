"use client";

import { TextField, Button, Box, Typography, Divider, CircularProgress, InputAdornment } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { gmailLogin } from "../lib/supabaseClientHelper";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLoginSignup } from "../hooks";

interface Props {
  type: "login" | "signup";
}

const LogInSignUp = ({ type }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const disabled = !password || !email;

  const { handleLogin, handleSignup, submitted, loginLoading, signupLoading } = useLoginSignup({ email, password });

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
        disabled={disabled || signupLoading || loginLoading}
        fullWidth
      >
        {signupLoading || loginLoading ? <CircularProgress /> : `${type}`}
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

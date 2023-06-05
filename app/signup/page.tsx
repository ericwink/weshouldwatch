"use client";

import { supabase } from "@/lib/supabase";
import { TextField, Button, Box, Container } from "@mui/material";
import { useState } from "react";

const gmailSignUp = async () => {
  supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

const passwordSignUp = async (email: string, password: string) => {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);
};

const signUpPage = async () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <h1>Login Page</h1>
        <TextField
          label="email"
          variant="outlined"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="password"
          variant="outlined"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            passwordLogin(email, password);
          }}
        >
          Login
        </Button>
        <button onClick={gmailLogin}>Login With Google</button>
      </Box>
    </Container>
  );
};

export default signUpPage;

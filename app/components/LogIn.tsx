"use client";

import { supabase } from "@/lib/supabase";
import { TextField, Button, Box, Container } from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/user";

const noPasswordLogin = async (email: string) => {
  let { data, error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) throw new Error(error.message);
};

const LogIn = () => {
  const { gmail } = useUser();
  const [email, setEmail] = useState("");

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

        <Button
          variant="contained"
          onClick={() => {
            noPasswordLogin(email);
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={gmail}
        >
          Login With Google
        </Button>
      </Box>
    </Container>
  );
};

export default LogIn;

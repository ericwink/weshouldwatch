"use client";

import { supabase } from "@/lib/supabase";
import { TextField, Button, Box, Container } from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/user";

const passwordSignUp = async (email: string, password: string) => {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { gmail } = useUser();

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <h1>Signup Page</h1>
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
            passwordSignUp(email, password);
          }}
        >
          Sign Up With Email
        </Button>
        <button onClick={gmail}>Sign Up With Google</button>
      </Box>
    </Container>
  );
};

export default SignUp;

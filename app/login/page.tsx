"use client";

import { supabase } from "@/lib/supabase";

const gmailLogin = async () => {
  supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

const loginPage = async () => {
  return (
    <>
      <h1>Login Page</h1>
      <button onClick={gmailLogin}>Login With Google</button>
    </>
  );
};

export default loginPage;

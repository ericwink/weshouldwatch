"use client";

import { supabase } from "@/lib/supabase";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const LogOut = async () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    console.log("click!");
    let { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={logout}
      >
        Log Out
      </Button>
      <Button
        variant="contained"
        onClick={() => console.log(session)}
      >
        View Session Data
      </Button>
    </>
  );
};

export default LogOut;

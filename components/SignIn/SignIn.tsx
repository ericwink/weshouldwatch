"use client";
import { Button } from "../ui/button";

import { useSession, signIn, signOut } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <Button onClick={() => signIn()}>Sign In</Button>
    </>
  );
};

export default SignIn;

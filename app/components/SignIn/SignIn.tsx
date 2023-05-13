"use client";

import { useSession, signIn, signOut } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
};

export default SignIn;

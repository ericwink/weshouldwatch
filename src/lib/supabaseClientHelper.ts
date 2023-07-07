import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserAccount } from "./interface";

const supabase = createClientComponentClient();

async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  return session;
}

export async function getUserAccount() {
  const session = await getSession();
  if (!session) return null;
  let { data, error } = await supabase.from("users").select("*, user_public_profile (profile_pic, user_name)").single();
  let userData = data as UserAccount;

  if (error) {
    throw new Error(error.message);
  }

  return userData;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return "user signed out successfully";
}

export async function gmailLogin() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
  if (error) console.log(error);
  if (error) throw new Error(error.message);
  return "user signed in successfully";
}

export async function noPasswordLogin(email: string) {
  let { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });
  if (error) console.log(error);
  if (error) throw new Error(error.message);
}

// not currently in use
export async function passwordSignUp(email: string, password: string) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) console.log(error);
}
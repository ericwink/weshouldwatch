import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserAccount } from "./interface";
import { GroupMedia } from "../app/mygroups/[id]/page";

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
  if (error) throw new Error(error.message);
  return "user signed in successfully";
}

// not currently in use
export async function signup(email: string, password: string) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) return { error: true, message: error.message };
  return { error: false, message: "Check your email to confirm your account" };
}

export async function login(email: string, password: string) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  const userData = await getUserAccount();
  return userData;
}

export async function fetchMediaCollection(id: string) {
  let { data: group_media, error } = await supabase
    .from("group_media")
    .select(
      `
    *,
    media (
      *
    ) , user_public_profile ( user_name, profile_pic )
  `
    )
    .eq("group_id", id)
    .order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return group_media as GroupMedia[];
}

export async function removeMediaFromGroup(rowId: number, groupId: string) {
  //get current session from jwt
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Please sign in and try again");

  const { error } = await supabase.from("group_media").delete().eq("id", rowId);

  if (error) throw new Error(error.message);
  return "Media removed successfully!";
}

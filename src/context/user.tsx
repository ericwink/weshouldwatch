"use client";

export const revalidate = 0;

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../lib/database.types";

const UserContext = createContext<any>(null);
const supabase = createClientComponentClient();

import { User } from "@supabase/supabase-js";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const getUserProfile = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    const user = session?.user || null;

    if (user) {
      let { data: users, error } = await supabase.from("users").select("*, user_public_profile (profile_pic, user_name)").eq("id", user.id).single();
      setUser({ ...user, ...users });
    }
  };

  useEffect(() => {
    getUserProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => getUserProfile());

    // return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    if (error) throw new Error(error.message);
  };

  const gmail = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) console.log(error);
  };

  const noPasswordLogin = async (email: string) => {
    let { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) console.log(error);
  };

  const passwordSignUp = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) console.log(error);
  };

  const values = {
    user,
    logout,
    gmail,
    noPasswordLogin,
    getUserProfile,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;

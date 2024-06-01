import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signup, login, gmailLogin } from "../lib/supabaseClientHelper";
import { useUserStore } from "../lib/store";
import { toast } from "react-toastify";
import { z } from "zod";
import { useState } from "react";

interface Args {
  email: string;
  password: string;
}

const useLoginSignup = (args: Args) => {
  const { email, password } = args;
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const mySchema = z.string().email({ message: "Please enter a valid email address" });
  const [submitted, setSubmitted] = useState(false);

  const { mutate: handleLogin, isLoading: loginLoading } = useMutation({
    mutationFn: async () => await login(email, password),
    onSuccess: data => {
      router.push("/dashboard");
      setUser(data);
    },
    onError: (error: any) => {
      toast.error(`${error.message}`, { theme: "colored" });
    },
  });

  const { mutate: handleSignup, isLoading: signupLoading } = useMutation({
    mutationFn: async () => {
      mySchema.parse(email);
      await signup(email, password);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: any | z.ZodError) => {
      if (error instanceof z.ZodError) {
        toast.error(`${error.issues[0].message}`, { theme: "colored" });
      } else {
        toast.error(`${error.message}`, { theme: "colored" });
      }
    },
  });

  return { handleLogin, handleSignup, submitted, loginLoading, signupLoading };
};

export default useLoginSignup;

"use client";

import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/supabaseClientHelper";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/lib/store";

const LogOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useUserStore(state => state.setUser);

  const { mutate: logoutUser } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
    },
    onSettled: () => {
      router.push("/");
    },
  });

  return (
    <Button
      variant="text"
      onClick={() => logoutUser()}
    >
      Log Out
    </Button>
  );
};

export default LogOut;

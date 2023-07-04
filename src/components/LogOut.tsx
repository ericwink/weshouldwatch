"use client";

import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/supabaseClientHelper";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logoutUser } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["userAccount"] });
      queryClient.setQueryData(["userAccount"], null);
    },
    onSettled: () => router.refresh(),
  });

  return (
    <Button
      variant="contained"
      onClick={() => logoutUser()}
    >
      Log Out
    </Button>
  );
};

export default LogOut;

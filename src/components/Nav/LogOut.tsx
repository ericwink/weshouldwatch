"use client";

import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/supabaseClientHelper";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logoutUser } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["userAccount"] });
      queryClient.setQueryData(["userAccount"], null);
    },
    onSettled: () => {
      router.push("/");
      setTimeout(() => {
        router.refresh();
      }, 500);
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

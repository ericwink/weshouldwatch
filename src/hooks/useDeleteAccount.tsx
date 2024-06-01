import { useMutation } from "@tanstack/react-query";
import type { UserAccount } from "../lib/interface";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useUserStore } from "@/src/lib/store";
import { useRouter } from "next/navigation";

interface Args {
  userAccount: UserAccount;
}

const useDeleteAccount = (args: Args) => {
  const { userAccount } = args;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const setUser = useUserStore(state => state.setUser);
  const router = useRouter();

  const { mutate: deleteAccount, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/user/deleteAccount", { userId: userAccount.id, stripeId: userAccount.stripe_customer });
    },
    onSuccess: () => {
      toast.success("Account deleted successfully", { theme: "colored" });
      setShowDeleteModal(false);
      setUser(null);
      router.push("/");
    },
    onError: (error: any) => {
      const message = error.response.data || "There was an error, please try again";
      toast.error(message, { theme: "colored" });
    },
  });

  return { deleteAccount, isLoading, showDeleteModal, setShowDeleteModal };
};

export default useDeleteAccount;

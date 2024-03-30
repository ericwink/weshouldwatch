"use client";

import { Button } from "@mui/material";
import { stripeCustomerPortal } from "@/src/lib/serverActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserAccount } from "@/src/lib/interface";

interface Props {
  userAccount: UserAccount;
}

const ManagePlan = ({ userAccount }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (userAccount.interval === "Test") {
      return toast.warn(`Your account was a gift! No need to manage Stripe settings.`);
    }
    createStripePortal();
  };

  const createStripePortal = async () => {
    const { error, message, sessionUrl } = await stripeCustomerPortal();
    if (error) return toast.error(`${message}`, { theme: "colored" });
    router.push(sessionUrl as string);
  };

  return <Button onClick={handleClick}>Manage Plan</Button>;
};

export default ManagePlan;

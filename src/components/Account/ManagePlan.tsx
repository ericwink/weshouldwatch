"use client";

import { Button } from "@mui/material";
import { stripeCustomerPortal } from "@/src/lib/serverActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ManagePlan = () => {
  const router = useRouter();

  const createStripePortal = async () => {
    const { error, message, sessionUrl } = await stripeCustomerPortal();
    if (error) return toast.error(`${message}`, { theme: "colored" });
    router.push(sessionUrl as string);
  };

  return <Button onClick={createStripePortal}>Manage Plan</Button>;
};

export default ManagePlan;

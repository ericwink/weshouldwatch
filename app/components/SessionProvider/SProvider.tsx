"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SProvider;

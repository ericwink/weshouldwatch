"use client";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  children: ReactNode;
  text: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const ModalTwo = ({ text, icon, title, description, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex gap-2">
          {icon}
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="self-center">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalTwo;

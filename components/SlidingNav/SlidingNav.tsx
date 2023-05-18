"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import SignIn from "../SignIn/SignIn";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";

const SlidingNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <IconContext.Provider value={{ size: "2em" }}>
          <GiHamburgerMenu />
        </IconContext.Provider>
      </SheetTrigger>
      <SheetContent position={"left"}>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
        </SheetHeader>
        {/* <SignIn /> */}
        <SearchBar />
        <Link href="/">Home</Link>
      </SheetContent>
    </Sheet>
  );
};

export default SlidingNav;

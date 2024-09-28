"use client";

import { ButtonGroup, Button } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const WatchedNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const watched = searchParams.get("watched");

  return (
    <ButtonGroup>
      <Button
        variant={!watched ? "contained" : "outlined"}
        onClick={() => router.replace(`${pathname}`)}
      >
        All
      </Button>
      <Button
        variant={watched === "false" ? "contained" : "outlined"}
        onClick={() => router.replace(`${pathname}?watched=false`)}
      >
        Not Watched
      </Button>
      <Button
        variant={watched === "true" ? "contained" : "outlined"}
        onClick={() => router.replace(`${pathname}?watched=true`)}
      >
        Watched
      </Button>
    </ButtonGroup>
  );
};

export default WatchedNavigation;

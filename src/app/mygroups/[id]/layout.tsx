"use client";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Link from "next/link";
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import { usePathname } from "next/navigation";
import WatchedNavigation from "./components/WatchedNavigation";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

const GroupLayout = ({ children, params }: Props) => {
  const pathname = usePathname();

  const getNavValue = () => {
    if (pathname.includes("movies")) return 0;
    if (pathname.includes("tv")) return 1;
    return 2;
  };

  return (
    <section className="w-full flex flex-col items-center justify-center gap-3">
      <div className="w-full mb-1 mt-1">
        <BottomNavigation value={getNavValue()} showLabels>
          <BottomNavigationAction
            label="Movies"
            LinkComponent={Link}
            href={`/mygroups/${params.id}/movies`}
            icon={<MovieIcon />}
          />
          <BottomNavigationAction
            label="TV Shows"
            href={`/mygroups/${params.id}/tv`}
            LinkComponent={Link}
            icon={<TvIcon />}
          />
          <BottomNavigationAction
            label="Group Info"
            LinkComponent={Link}
            icon={<GroupIcon />}
            href={`/mygroups/${params.id}/info`}
          />
        </BottomNavigation>
      </div>

      {!pathname.includes("info") && (
        <Suspense fallback={<div>Loading...</div>}>
          <WatchedNavigation />
        </Suspense>
      )}

      {children}
    </section>
  );
};

export default GroupLayout;

"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import { usePathname } from "next/navigation";

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
    <section className="w-full flex flex-col items-center">
      <Box sx={{ width: 500 }}>
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
      </Box>

      {children}
    </section>
  );
};

export default GroupLayout;

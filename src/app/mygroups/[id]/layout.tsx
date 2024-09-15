"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="TV Shows"
            href={`/mygroups/${params.id}/tv`}
            LinkComponent={Link}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Group Info"
            LinkComponent={Link}
            icon={<LocationOnIcon />}
            href={`/mygroups/${params.id}/info`}
          />
        </BottomNavigation>
      </Box>

      {children}
    </section>
  );
};

export default GroupLayout;

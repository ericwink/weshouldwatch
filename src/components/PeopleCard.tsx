"use client";

import getPoster from "@/src/lib/getPoster";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";

interface Props {
  person: {
    profile_path: string;
    name: string;
    id: number;
    media_type: string;
  };
}

// need to add character: string, department: string

const PeopleCard = ({ person }: Props) => {
  return (
    <Grid>
      <button>
        <Link
          className="flex"
          href={`/person/${person.id}`}
        >
          <Paper
            elevation={3}
            sx={{ width: "135px" }}
          >
            <Box sx={{ height: 200, position: "relative" }}>
              <Image
                src={getPoster(person.profile_path, "200")}
                alt={person.name}
                fill={true}
                style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
              />
            </Box>
            <Grid container>
              <Grid
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={1}
              >
                <Typography variant="subtitle2">{person.name}</Typography>
              </Grid>
              {/* <Grid
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton>
              <Link
                className="flex"
                href={`/person/${person.id}`}
              >
                <InfoIcon />
              </Link>
            </IconButton>
          </Grid> */}
            </Grid>
          </Paper>
        </Link>
      </button>
    </Grid>
  );
};

export default PeopleCard;

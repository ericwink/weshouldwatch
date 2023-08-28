"use client";

import getPoster from "@/src/lib/getPoster";
import { Paper, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import Link from "next/link";

interface Props {
  person: {
    profile_path: string;
    name: string;
    id: number;
    character?: string;
    jobs?: string[];
  };
}

const credits = (credit: string) => (
  <Grid
    xs={12}
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Typography variant="subtitle2">
      <i>{credit}</i>
    </Typography>
  </Grid>
);

const PeopleCard = ({ person }: Props) => {
  return (
    <Grid>
      <button style={{ height: "100%" }}>
        <Link
          className="flex"
          href={`/person/${person.id}`}
          style={{ height: "100%" }}
        >
          <Paper
            elevation={3}
            sx={{ width: "135px", height: "100%" }}
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
              {person.character && credits(person.character)}
              {person.jobs && person.jobs.map(job => credits(job))}
            </Grid>
          </Paper>
        </Link>
      </button>
    </Grid>
  );
};

export default PeopleCard;

"use client";

import { Typography, Box, Paper, Avatar, Container } from "@mui/material";
import getPoster from "../lib/getPoster";

interface Bio {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

interface Props {
  person: Bio;
}

const PersonBio = ({ person }: Props) => {
  const image = getPoster(person.profile_path, "200");

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center", mb: 3 }}>
        <Avatar
          src={image}
          alt={person.name}
          sx={{ height: 150, width: 150 }}
        />
        <Typography
          variant="h3"
          component="h2"
        >
          {person.name}
        </Typography>
        <Typography>Born: {person.birthday}</Typography>
        {person.deathday && <Typography>Died: {person.deathday}</Typography>}
        <Typography>Birthplace: {person.place_of_birth}</Typography>
      </Box>
      <Typography>{person.biography}</Typography>
    </Container>
  );
};

export default PersonBio;

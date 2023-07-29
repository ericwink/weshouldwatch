"use client";

import { Container, Avatar, Typography, Box } from "@mui/material";
import InviteToAGroup from "../InviteToAGroup";
import { MemberData } from "@/src/app/mygroups/[id]/page";

interface Props {
  groupId: number;
  members: MemberData[];
}

const memberDisplay = (member: MemberData) => (
  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
    <Avatar src={member.user_public_profile.profile_pic || ""} />
    <Typography>{member.user_public_profile.user_name}</Typography>
  </Box>
);

const GroupDetails = ({ groupId, members }: Props) => {
  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography>Members: </Typography>
      {members.map(member => memberDisplay(member))}
      <InviteToAGroup groupId={groupId} />
    </Container>
  );
};

export default GroupDetails;

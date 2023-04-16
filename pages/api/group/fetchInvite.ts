import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const fetchInvite = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;

  try {
    const invite = await prisma.invitation.findUnique({
      where: {
        invitationToken: token,
      },
    });

    if (!invite) {
      res.status(404).json({ error: "Invitation not found!" });
      return;
    }

    const group = await prisma.group.findUnique({
      where: {
        id: invite.groupId,
      },
    });

    const data = { ...invite, groupName: group?.name };

    res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchInvite;

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

interface IBody {
  email: string;
  invitationToken: string;
}

const acceptInvite = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, invitationToken }: IBody = req.body;

  try {
    const invitation = await prisma.invitation.findUnique({
      where: {
        invitationToken,
      },
    });

    if (!invitation || invitation.invitedUserEmail !== email) {
      res.status(404).json({ error: "Invitation not found!" });
      return;
    }

    const currentUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        groupIDs: {
          push: invitation.groupId,
        },
      },
    });

    const group = await prisma.group.update({
      where: {
        id: invitation.groupId,
      },
      data: {
        userIDs: {
          push: currentUser.id,
        },
      },
    });

    await prisma.invitation.delete({
      where: {
        invitationToken,
      },
    });

    res.send({ message: "Successfully joined group!" });
  } catch (error: any) {
    console.log(error);
    res.send({ message: error.message });
  }
};

export default acceptInvite;

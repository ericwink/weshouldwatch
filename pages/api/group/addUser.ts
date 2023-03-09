import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, groupID } = req.body;

  try {
    const currentUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        groupIDs: {
          push: groupID,
        },
      },
    });

    const group = await prisma.group.update({
      where: {
        id: groupID,
      },
      data: {
        userIDs: {
          push: currentUser.id,
        },
      },
    });

    console.log({ currentUser });
    console.log({ group });

    res.send({ message: "user added!" });
  } catch (error: any) {
    console.log(error);
    res.send({ message: error.message });
  }
};

export default addUser;

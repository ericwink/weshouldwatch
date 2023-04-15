import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const fetchGroups = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        groups: {},
      },
    });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(foundUser.groups);
  } catch (error: any) {
    console.error("Error fetching user", error);
    return res.status(500).json({ message: "Error fetching user", error });
  }
};

export default fetchGroups;

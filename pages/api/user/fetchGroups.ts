import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const fetchGroups = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  console.log({ email });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.groupIDs);
  } catch (error: any) {
    console.error("Error fetching user", error);
    return res.status(500).json({ message: "Error fetching user", error });
  }
};

export default fetchGroups;

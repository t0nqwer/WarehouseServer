import axios from "axios";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const StoreList = async (req, res) => {
  try {
    const data = await prisma.storelist.findMany({
      select: {
        Name: true,
      },
    });
    const response = data.map(({ Name }) => Name);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

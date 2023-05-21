import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const Updatebarcode = async (req, res, next) => {
  try {
    const barcode = await prisma.stockProduct.findMany({});
    res.status(200).json(barcode);
  } catch (error) {}
};

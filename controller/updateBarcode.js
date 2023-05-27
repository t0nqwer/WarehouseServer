import axios from "axios";
import pkg from "@prisma/client";
import pkg2 from "node-schedule";
const { scheduleJob } = pkg2;
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const CheckBarcode = async () => {
  try {
    const response = await axios.get(
      "https://khwanta-api2546.com/stock/stockdata"
    );

    const currentbarcode = await prisma.stockProduct.findMany({
      select: {
        barcode: true,
      },
    });
    const currentlist = currentbarcode.map((item) => item.barcode);
    const removeDuplicate = [...new Set(currentlist)];
    const newlist = response.data.map((item) => item.barcode);

    const newbarcode = newlist.filter((item) => !currentlist.includes(item));

    const newproduct = response.data.filter((n) =>
      newbarcode.some((n2) => n.barcode == n2)
    );
    const oldproduct = response.data.filter((n) =>
      currentlist.some((n2) => n.barcode == n2)
    );
    const create = newproduct.map(
      async (item) =>
        await prisma.stockProduct.create({
          data: {
            barcode: item.barcode,
            cloth: item.cloth,
            size: item.size,
            code: item.code,
            name: item.name,
            fabric: item.fabric,
            sort: +item.sort ? +item.sort : null,
            price: +item.price,
            brand: item.brand,
          },
        })
    );
    const deletebarcode = currentlist.filter((item) => !newlist.includes(item));
    deletebarcode.map(
      async (item) =>
        await prisma.stockProduct.delete({
          where: { barcode: item },
        })
    );
    const updateBarcode = oldproduct.map(
      async (item) =>
        await prisma.stockProduct.update({
          where: { barcode: item.barcode },
          data: {
            cloth: item.cloth,
            size: item.size,
            code: item.code,
            name: item.name,
            fabric: item.fabric,
            sort: +item.sort ? +item.sort : null,
            price: +item.price,
            brand: item.brand,
          },
        })
    );
    console.log(
      deletebarcode,
      currentlist.length,
      newlist.length,
      create.length,
      updateBarcode.length
    );
  } catch (error) {
    console.log(error.message);
  }
};
scheduleJob("57 * * * *", () => CheckBarcode());

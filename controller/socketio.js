import axios from "axios";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const updatePrice = async (barcode, price) => {
  try {
    prisma.$transaction(
      barcode.map((item) =>
        prisma.stockProduct.update({
          where: { barcode: item },
          data: { price: +price },
        })
      )
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const addNewUser = async (name, ID) => {
  console.log("add", name, ID);
  try {
    await prisma.storelist.update({
      where: {
        Name: name,
      },
      data: {
        connection_id: ID,
        status: true,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const removeUser = async (id) => {
  console.log("remove", id);
  try {
    await prisma.storelist.update({
      where: { connection_id: id },
      data: { status: false },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addsize = async (data) => {
  console.log(data);
  try {
    await prisma.stockProduct.createMany({
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const newCloth = async (data) => {
  console.log(data);
  try {
    await prisma.stockProduct.createMany({
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

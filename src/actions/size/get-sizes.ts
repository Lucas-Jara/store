"use server";

import prisma from "@/lib/prisma";

export const getSizes = async () => {
  try {
    const sizes = await prisma.size.findMany({
      orderBy: {
        size: "asc",
      },
    });

    return sizes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

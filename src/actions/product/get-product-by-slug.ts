"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
        Sizes: true,
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
      sizes: product.Sizes.map((size) => {
        const { productId, ...rest } = size;
        return rest;
      }),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
};

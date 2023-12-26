import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();

  await prisma.productSize.deleteMany();
  await prisma.size.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.province.deleteMany();

  const { categories, products, users, provinces, sizes } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.province.createMany({
    data: provinces,
  });

  // Sizes
  const sizeData = sizes.map((size) => ({ size }));

  await prisma.size.createMany({
    data: sizeData,
  });

  const sizesDB = await prisma.size.findMany();

  const sizesMap = sizesDB.reduce((map, size) => {
    map[size.size.toUpperCase()] = size.id;
    return map;
  }, {} as any);

  // Categories
  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // Productos
  products.forEach(async (product) => {
    const { type, images, sizes: productSizes, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // ProductSize
    productSizes.map(async (size) => {
      const { size: caca, ...rest } = size;

      await prisma.productSize.createMany({
        data: {
          ...rest,
          productId: dbProduct.id,
          sizeId: sizesMap[caca],
        },
      });
    });

    // Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();

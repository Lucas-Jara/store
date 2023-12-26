"use server";
import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import type { Address } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  sizes: Size[];
  price: number;
}

interface Size {
  sizeId: string;
  quantity: number;
}

type Caca = {
  [key: string]: number;
}[];

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // Obtener la información de los productos
  // Nota: recuerden que podemos llevar 2+ productos con el mismo ID
  const sizes = await prisma.productSize.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.sizes.map((s) => s.sizeId)).flat(),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((total, item) => {
    const productSubTotal = item.sizes.reduce(
      (subTotal, product) => product.quantity + subTotal,
      0
    );
    return total + productSubTotal;
  }, 0);

  // Los totales de tax, subtotal, y total
  const subTotal = productIds.reduce((total, item) => {
    const count = item.sizes.reduce(
      (subTotal, product) => product.quantity * item.price + subTotal,
      0
    );
    return total + count;
  }, 0);
  const tax = subTotal * 0.15;
  const total = subTotal + tax;

  // Crear la transacción de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updateSizeStockPromise = productIds.map((p) => {

        return p.sizes.map(async (s) => {
          await tx.productSize.updateMany({
            where: { id: s.sizeId },
            data: {
              inStock: {
                decrement: s.quantity,
              },
            },
          });
        });
      });

      const updateSizeStock = await Promise.all(updateSizeStockPromise);

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                price: p.price,
                productId: p.productId,
              })),
            },
          },
        },
      });

      // Validar, si el price es cero, entonces, lanzar un error

      // 3. Crear la direccion de la orden
      // Address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updateSizeStock: updateSizeStock,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};

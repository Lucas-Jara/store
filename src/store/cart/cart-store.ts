import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (
    product: CartProduct,
    sizeId: string,
    quantity: number
  ) => void;
  removeProduct: (product: CartProduct) => void;
  removeSize: (productId: string, sizeId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce((total, item) => {
          const productSubTotal = item.sizes.reduce(
            (subTotal, product) => product.quantity * item.price + subTotal,
            0
          );
          return total + productSubTotal;
        }, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((total, item) => {
          const productSubTotal = item.sizes.reduce(
            (subTotal, product) => product.quantity + subTotal,
            0
          );
          return total + productSubTotal;
        }, 0);

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productIndex = cart.findIndex((item) => item.id === product.id);

        if (productIndex === -1) {
          // El producto no está en el carrito, lo agregamos directamente
          set({ cart: [...cart, product] });
          return;
        }

        const existingProduct = cart[productIndex];

        const sizeIndex = existingProduct.sizes.findIndex(
          (size) => size.id === product.sizes[0].id
        );

        if (sizeIndex === -1) {
          // El producto está en el carrito, pero no con el mismo tamaño
          existingProduct.sizes.push(product.sizes[0]);
        } else {
          // El producto está en el carrito con el mismo tamaño, actualizamos la cantidad
          existingProduct.sizes[sizeIndex].quantity +=
            product.sizes[0].quantity;
        }

        // Actualizamos el carrito
        const updatedCart = [...cart];
        updatedCart[productIndex] = existingProduct;
        set({ cart: updatedCart });
      },

      updateProductQuantity: (
        product: CartProduct,
        sizeId: string,
        quantity: number
      ) => {
        const { cart } = get();

        const productIndex = cart.findIndex((item) => item.id === product.id);

        if (productIndex !== -1) {
          const existingProduct = { ...cart[productIndex] };
          const sizeIndex = existingProduct.sizes.findIndex(
            (size) => size.id === sizeId
          );

          if (sizeIndex !== -1) {
            existingProduct.sizes[sizeIndex].quantity = quantity;

            const updatedCart = [...cart];
            updatedCart[productIndex] = existingProduct;

            set({ cart: updatedCart });
          }
        }
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCart = cart.filter((item) => item.id !== product.id);

        set({ cart: updatedCart });
      },
      removeSize: (productId: string, sizeId: string) => {
        const { cart } = get();

        const productIndex = cart.findIndex((item) => item.id === productId);

        if (productIndex !== -1) {
          const existingProduct = { ...cart[productIndex] };
          const updatedSizes = existingProduct.sizes.filter(
            (size) => size.id !== sizeId
          );

          if (updatedSizes.length === 0) {
            // Si no quedan tamaños, elimina el producto completo
            const updatedCart = cart.filter((item) => item.id !== productId);
            set({ cart: updatedCart });
          } else {
            // Actualiza el carrito con los tamaños actualizados
            existingProduct.sizes = updatedSizes;
            const updatedCart = [...cart];
            updatedCart[productIndex] = existingProduct;
            set({ cart: updatedCart });
          }
        }
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);

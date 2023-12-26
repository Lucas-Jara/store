"use client";

import { useEffect, useState } from "react";
import type {
  CartProduct,
  CartProductSize,
  Product,
  ProductSize,
  Size,
} from "@/interfaces";
import { useCartStore } from "@/store";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  sizes: Size[];
}

interface ProductCartSize {
  sizeId: string;
  quantity: number;
}

export const AddToCart = ({ product, sizes }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [sizeSelected, setSizeSelected] = useState<{
    [sizeId: string]: CartProductSize;
  }>({} as Record<string, CartProductSize>);

  // Estado temporal del producto en el carrito
  const [tempProduct, setTempProduct] = useState<CartProduct>({
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    image: product.images[0],
    sizes: [],
  });

  const onSizeQuantityChange = (size: ProductSize, quantity: number) => {
    setSizeSelected((prev) => {
      const selectedSize = prev[size.sizeId] || { ...size };

      const newQuantity = Math.min(
        Math.max(selectedSize.quantity + quantity, 0),
        size.inStock
      );

      if (newQuantity > 0) {
        return {
          ...prev,
          [size.sizeId]: { ...selectedSize, quantity: newQuantity },
        };
      } else {
        const { [size.sizeId]: deletedSize, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleSizeChange = (size: ProductSize) => {
    const sizeIsSelected = sizeSelected[size.sizeId];

    if (!sizeIsSelected) {
      setSizeSelected((prev) => ({
        ...prev,
        [size.sizeId]: {
          ...size,
          quantity: 1,
        },
      }));
      return;
    }

    setSizeSelected((prev) => {
      delete prev[size.sizeId];
      return { ...prev };
    });
  };

  useEffect(() => {
    setTempProduct((prev) => ({
      ...prev,
      sizes: Object.entries(sizeSelected).map(([key, quantity]) => ({
        ...quantity,
        sizeId: key,
      })),
    }));
  }, [sizeSelected]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {product.sizes.map((size) => (
          <Button
            key={size.id}
            disabled={size.inStock === 0}
            className={cn({
              "cursor-not-allowed": size.inStock === 0,
            })}
            onClick={() => handleSizeChange(size)}
            variant={sizeSelected[size.sizeId] ? "default" : "outline"}
          >
            {sizes.map((s) => s.id === size.sizeId && s.size)}
          </Button>
        ))}
      </div>

      {Object.entries(sizeSelected).map(([key, size]) => (
        <div key={key} className="flex flex-col py-2">
          <label className="text-secondary-foreground text-gray-400 text-sm">
            Size: {sizes.map((s) => s.id === key && s.size)}
          </label>
          <div className="grid grid-cols-3 col-span-3 items-center my-2">
            <Button onClick={() => onSizeQuantityChange(size, -1)}>
              <MinusIcon className="w-4 h-4" />
            </Button>
            <span className="text-black text-center">{size.quantity}</span>
            <Button onClick={() => onSizeQuantityChange(size, 1)}>
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Selector de Cantidad */}

      {/* Button */}
      <Button
        disabled={Object.entries(sizeSelected).length === 0}
        onClick={() => addProductToCart(tempProduct)}
        className="btn-primary my-5"
      >
        {Object.entries(sizeSelected).length > 0 ? (
          <>
            <ShoppingBag className="mr-2 h-4 w-4" /> Agregar al carrito
          </>
        ) : (
          "Seleccione una talla"
        )}
      </Button>
    </>
  );
};

"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { currencyFormat } from "@/utils";
import { Size } from "@/interfaces";

interface Props {
  sizes: Size[];
}

export const ProductsInCart = ({ sizes }: Props) => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);
  const { cart, removeSize } = useCartStore();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {cart.map((product) => (
        <Card key={`${product.slug}`}>
          <CardHeader>
            <div className="flex relative">
              <ProductImage
                src={product.image}
                width={100}
                height={100}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt={product.title}
                className="grow rounded"
              />
              <Button
                onClick={() => removeProduct(product)}
                variant="destructive"
                size="icon"
                className="absolute top-5 right-5"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Link
              className="underline md:no-underline hover:underline text-lg font-semibold"
              href={`/product/${product.slug} `}
            >
              {product.title}
            </Link>

            <p className="text-primary-foreground text-stone-700 text-sm">
              {currencyFormat(product.price)}
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-3 flex-wrap">
              {product.sizes?.map((size) => (
                <Button
                  key={size.id}
                  onClick={() => removeSize(product.id, size.id)}
                >
                  {sizes.map((s) => s.id === size.sizeId && s.size)}
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

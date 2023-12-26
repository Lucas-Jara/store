"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/interfaces";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className="flex gap-3 flex-wrap mt-3">
        {/* {product.sizes.map((size) => (
          <Button className="btn-primary" key={size.id}>
            {size.size}
          </Button>
        ))} */}
      </div>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};

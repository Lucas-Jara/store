"use client";

import { useForm } from "react-hook-form";
import {
  Category,
  Product,
  Size,
  ProductImage as ProductWithImage,
} from "@/interfaces";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";
import { Button } from "@/components/ui/button";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
  sizes: Size[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  sizes: Size[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories, sizes }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes,

      images: undefined,
    },
  });
  watch("sizes");
  

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    // sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    // setValue("sizes", Array.from(sizes));
    console.log(size);
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, sizes, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    // formData.append("sizes", productToSave.sizes);
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Producto no se pudo actualizar");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Button variant="outline">Guardar</Button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap gap-2">
            {sizes.map(({ size, id }) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <Button
                type="button"
                variant="outline"
                key={id}
                // onClick={() => onSizeChanged(size)}
              >
                <span>{size}</span>
              </Button>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ""}
                  src={image.url}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

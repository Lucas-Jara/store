import bcryptjs from "bcryptjs";

interface SeedProduct {
  description: string;
  images: string[];
  price: number;
  sizes: SeedProductSize[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

interface SeedProductSize {
  size: string;
  limitToBuy: number;
  inStock: number;
}

type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";

interface SeedProvince {
  name: string;
  tax: number;
}

interface SeedData {
  users: SeedUser[];
  categories: string[];
  sizes: string[];
  provinces: SeedProvince[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "fernando@google.com",
      name: "Fernando Herrera",
      password: bcryptjs.hashSync("123456"),
      role: "admin",
    },
    {
      email: "melissa@google.com",
      name: "Melissa Flores",
      password: bcryptjs.hashSync("123456"),
      role: "user",
    },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  categories: ["Shirts", "Pants", "Hoodies", "Hats"],
  provinces: [
    { name: "Buenos Aires", tax: 1.2 },
    { name: "CABA", tax: 1.3 },
    { name: "Catamarca", tax: 1.1 },
    { name: "Chaco", tax: 1.15 },
    { name: "Chubut", tax: 1.25 },
    { name: "Córdoba", tax: 1.2 },
    { name: "Corrientes", tax: 1.1 },
    { name: "Entre Ríos", tax: 1.2 },
    { name: "Formosa", tax: 1.05 },
    { name: "Jujuy", tax: 1.1 },
    { name: "La Pampa", tax: 1.15 },
    { name: "La Rioja", tax: 1.05 },
    { name: "Mendoza", tax: 1.25 },
    { name: "Misiones", tax: 1.05 },
    { name: "Neuquén", tax: 1.2 },
    { name: "Río Negro", tax: 1.2 },
    { name: "Salta", tax: 1.1 },
    { name: "San Juan", tax: 1.15 },
    { name: "San Luis", tax: 1.15 },
    { name: "Santa Cruz", tax: 1.25 },
    { name: "Santa Fe", tax: 1.2 },
    { name: "Santiago del Estero", tax: 1.1 },
    { name: "Tierra del Fuego", tax: 1.25 },
    { name: "Tucumán", tax: 1.1 },
  ],
  products: [
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
      price: 75,
      sizes: [
        {
          size: "XL",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "mens_chill_crew_neck_sweatshirt",
      type: "shirts",
      tags: ["sweatshirt"],
      title: "Men’s Chill Crew Neck Sweatshirt",
      gender: "men",
    },
    {
      description:
        "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
      images: ["1740507-00-A_0_2000.jpg", "1740507-00-A_1.jpg"],
      price: 200,
      sizes: [
        {
          size: "L",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_quilted_shirt_jacket",
      type: "shirts",
      tags: ["jacket"],
      title: "Men's Quilted Shirt Jacket",
      gender: "men",
    },

    {
      description:
        "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
      images: ["1740250-00-A_0_2000.jpg", "1740250-00-A_1.jpg"],
      price: 130,
      sizes: [
        {
          size: "XXL",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_raven_lightweight_zip_up_bomber_jacket",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Raven Lightweight Zip Up Bomber Jacket",
      gender: "men",
    },

    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      images: ["1740280-00-A_0_2000.jpg", "1740280-00-A_1.jpg"],
      price: 45,
      sizes: [
        {
          size: "S",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_turbine_long_sleeve_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Turbine Long Sleeve Tee",
      gender: "men",
    },
    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      images: ["1741416-00-A_0_2000.jpg", "1741416-00-A_1.jpg"],
      price: 40,
      sizes: [
        {
          size: "XL",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_turbine_short_sleeve_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Turbine Short Sleeve Tee",
      gender: "men",
    },
    {
      description:
        "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
      images: ["7654393-00-A_2_2000.jpg", "7654393-00-A_3.jpg"],
      price: 35,
      sizes: [
        {
          size: "M",
          inStock: 8,
          limitToBuy: 3,
        },

        {
          size: "XL",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_cybertruck_owl_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Cybertruck Owl Tee",
      gender: "men",
    },
    {
      description:
        "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      images: ["1703767-00-A_0_2000.jpg", "1703767-00-A_1.jpg"],
      price: 35,
      sizes: [
        {
          size: "S",
          inStock: 8,
          limitToBuy: 3,
        },
        {
          size: "M",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_solar_roof_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Solar Roof Tee",
      gender: "men",
    },
    {
      description:
        "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      images: ["1700280-00-A_0_2000.jpg", "1700280-00-A_1.jpg"],
      price: 35,
      sizes: [
        {
          size: "S",
          inStock: 8,
          limitToBuy: 3,
        },
        {
          size: "M",
          inStock: 8,
          limitToBuy: 3,
        },
        {
          size: "XXL",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_let_the_sun_shine_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Let the Sun Shine Tee",
      gender: "men",
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
      images: ["8764734-00-A_0_2000.jpg", "8764734-00-A_1.jpg"],
      price: 35,
      sizes: [
        {
          size: "S",
          inStock: 8,
          limitToBuy: 3,
        },
        {
          size: "XXL",
          inStock: 8,
          limitToBuy: 3,
        },
      ],
      slug: "men_3d_large_wordmark_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's 3D Large Wordmark Tee",
      gender: "men",
    },
  ],
};

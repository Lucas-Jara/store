"use server";

import MercadoPagoConfig, { Preference } from "mercadopago";

export const setTransactionIdMP = async () => {
  const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_PUBLIC_MP_SECRET_KEY!,
  });

  const preference = new Preference(client);

  try {
    const { init_point } = await preference.create({
      body: {
        items: [
          {
            id: "<ID>",
            title: "<title>",
            quantity: 1,
            unit_price: 100,
            picture_url: ""
          },
        ],
      },
    });

    return init_point;
  } catch (error) {
    console.log(error);
  }
};

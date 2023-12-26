"use client"
import { setTransactionIdMP } from "@/actions/payments/mercado-pago/set-transaction-id";
import React from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";


export const MPButton = async () => {
  
  return (
    <Button onClick={async()=> console.log(await setTransactionIdMP())}>Pagar</Button>
    );
};

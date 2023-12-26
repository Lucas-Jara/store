"use client";
import { useEffect, useState } from "react";

import Link from "next/link";

import { useCartStore, useUIStore } from "@/store";
import { Sidebar } from "../sidebar/Sidebar";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";

export const TopMenu = () => {
  const { itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="sticky z-50 top-0 w-full bg-white shadow-sm border-b border-stone-200">
      <div className="container">
        <nav className="flex h-16 justify-between items-center w-full">
          {/* Logo */}
          <div>
            <Link href="/">
              <span className={` font-bold`}>QBO</span>
              <span className="text-secondary-foreground text-stone-400">
                {" "}
                - Store
              </span>
            </Link>
          </div>
          

          {/* Search, Cart, Menu */}
          <div className="flex items-center">
            <Link href="/search" className="mx-2">
              <SearchIcon className="w-5 h-5" />
            </Link>

            <Link
              href={itemsInCart === 0 && loaded ? "/empty" : "/cart"}
              className="mx-2"
            >
              <div className="relative">
                {loaded && itemsInCart > 0 && (
                  <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                    {itemsInCart}
                  </span>
                )}
                <ShoppingCartIcon className="w-5 h-5" />
              </div>
            </Link>

            <Sidebar />
          </div>
        </nav>
      </div>
    </div>
  );
};

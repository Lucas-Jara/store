"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
// import {
//   IoCloseOutline,
//   IoLogInOutline,
//   IoLogOutOutline,
//   IoPeopleOutline,
//   IoPersonOutline,
//   IoSearchOutline,
//   IoShirtOutline,
//   IoTicketOutline,
// } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUIStore } from "@/store";
import { logout } from "@/actions";
import { MenuIcon } from "lucide-react";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <>
      <Sheet >
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when youre done.
            </SheetDescription>
          </SheetHeader>
          <div>
            {/* Input */}
            <div className="relative mt-14">
              <Input type="search" placeholder="Buscar..." />
            </div>

            {/* Menú */}

            {isAuthenticated && (
              <>
                <Link
                  href="/profile"
                  onClick={() => closeMenu()}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  {/* <IoPersonOutline size={30} /> */}
                  <span className="ml-3 text-xl">Perfil</span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() => closeMenu()}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  {/* <IoTicketOutline size={30} /> */}
                  <span className="ml-3 text-xl">Ordenes</span>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <button
                className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => logout()}
              >
                {/* <IoLogOutOutline size={30} /> */}
                <span className="ml-3 text-xl">Salir</span>
              </button>
            )}

            {!isAuthenticated && (
              <Link
                href="/auth/login"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => closeMenu()}
              >
                {/* <IoLogInOutline size={30} /> */}
                <span className="ml-3 text-xl">Ingresar</span>
              </Link>
            )}

            {isAdmin && (
              <>
                {/* Line Separator */}
                <div className="w-full h-px bg-gray-200 my-10" />

                <Link
                  href="/admin/products"
                  onClick={() => closeMenu()}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  {/* <IoShirtOutline size={30} /> */}
                  <span className="ml-3 text-xl">Productos</span>
                </Link>

                <Link
                  href="/admin/orders"
                  onClick={() => closeMenu()}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  {/* <IoTicketOutline size={30} /> */}
                  <span className="ml-3 text-xl">Ordenes</span>
                </Link>

                <Link
                  href="/admin/users"
                  onClick={() => closeMenu()}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  {/* <IoPeopleOutline size={30} /> */}
                  <span className="ml-3 text-xl">Usuarios</span>
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

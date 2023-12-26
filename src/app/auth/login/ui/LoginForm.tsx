"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { authenticate } from "@/actions";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogInIcon } from "lucide-react";
// import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  // const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      // redireccionar
      // router.replace('/');
      window.location.replace("/");
    }
  }, [state]);

  return (
    <Card>
      <form action={dispatch} className="flex flex-col">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, youll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" type="email" name="email" autoComplete="true" autoFocus />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" name="password" autoComplete="true" />
          </div>
        </CardContent>
        {state === "CredentialsSignin" && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex flex-row mb-2">
              {/* <IoInformationOutline className="h-5 w-5 text-red-500" /> */}
              <p className="text-sm text-red-500">
                Credenciales no son correctas
              </p>
            </div>
          </div>
        )}
        <CardFooter className="flex flex-col items-stretch">
          <LoginButton />
        </CardFooter>
      </form>
    </Card>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      <LogInIcon className="w-4 h-4 mr-3" /> Ingresar
    </Button>
  );
}

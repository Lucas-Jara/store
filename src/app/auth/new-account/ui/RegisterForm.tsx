"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registerUser } from "@/actions";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { name, email, password } = data;

    // Server action
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, youll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              autoComplete="true"
              autoFocus
              type="text"
              {...register("name", { required: true })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              autoComplete="true"
              type="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              autoComplete="true"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
          <span className="text-red-500">{errorMessage} </span>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Crear cuenta</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

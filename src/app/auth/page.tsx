import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { LoginForm } from './login/ui/LoginForm'
import { RegisterForm } from './new-account/ui/RegisterForm'

const AuthPage = () => {
    return (
        <Tabs defaultValue="password" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="password">Crear cuenta</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <LoginForm />
          </TabsContent>
          <TabsContent value="password">
          <RegisterForm />
          </TabsContent>
        </Tabs>
      )
}

export default AuthPage
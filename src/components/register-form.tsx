"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useState } from "react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const form = e.currentTarget
    const nome = (form.elements.namedItem("nome") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const senha = (form.elements.namedItem("senha") as HTMLInputElement).value

    // Troque a URL abaixo pela sua rota de registro
    const res = await fetch("https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/registrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    })

    if (res.ok) {
      setSuccess("Conta criada com sucesso! Faça login.")
      form.reset()

      // Login automático após registro
      await signIn("credentials", {
        email,
        senha,
        callbackUrl: "/albums"
      })
      return;
    } else {
      setError("Erro ao registrar. Tente outro e-mail.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Registre-se com seu e-mail
          </CardDescription>
          {error && (
            <div className="mt-2 text-red-600 font-semibold">{error}</div>
          )}
          {success && (
            <div className="mt-2 text-green-600 font-semibold">{success}</div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

                <div className="grid gap-3">
                <Label htmlFor="nome">Usuário</Label>
                <Input
                  id="nome"
                  type="nome"
                  placeholder="user_123"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="cursor-pointer w-full">
                  Registrar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

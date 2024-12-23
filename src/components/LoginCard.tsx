'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginCard() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(e.target.value)
    }

    const handleLogin = async () => {
        const payload = {
            email,
            senha
        }

        try {
            const response = await fetch('http://localhost:4000/api/user/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })

            const { token } = await response.json()

            document.cookie = `token=${token}`

            router.push('/')


        } catch (e){
            console.log(e)
        }
    }

    
    return (
        <main className="flex justify-center items-center h-screen w-screen">
            <Card className="p-4 flex flex-col gap-8 w-96">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tighter">Entre com a sua conta</CardTitle>
                    <CardDescription>Ultilize seu email e senha</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="exemplo@email.com" type="email" onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <Label htmlFor="senha">Senha</Label>
                        <Input id="senha" placeholder="senha" type="password" onChange={handleSenhaChange}/>
                    </div>

                    <Button className="mt-6 w-full" onClick={handleLogin}>Entrar</Button>

                    <div className="flex items-center gap-6 mt-4">
                        <Separator />
                            <span className="text-xs text-muted-foreground">OU</span>
                        <Separator />
                    </div>

                    <Button variant={"secondary"} className="mt-6 w-full">Registrar</Button>
                </CardContent>
            </Card>
        </main>
    )
}
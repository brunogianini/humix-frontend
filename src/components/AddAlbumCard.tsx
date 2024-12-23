'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import Cookies from 'js-cookie';

export default function AddAlbumCard() {
    const [nome, setNome] = useState("")
    const [banda, setBanda] = useState("")

    async function createAlbum(nome: string, banda: string) {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado.');
        }

        const res = await fetch('https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/api/album', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
                "Access-Control-Allow-Origin": '*'
            },
            cache: 'no-store',
            body: JSON.stringify({nome: nome, banda: banda})
            
        })
        window.location.reload()
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button variant={"secondary"} className="">Adicionar Album</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Adicionar Album</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogContent>
                    <Input placeholder="Nome do Álbum" onChange={(e) => setNome(e.target.value)} />
                    <Input placeholder="Banda" onChange={(e) => setBanda(e.target.value)} />

                    <Button variant={"secondary"} onClick={(e) => {createAlbum(nome, banda)}}>Adicionar Album</Button>
                </AlertDialogContent>
            </AlertDialogContent>
        </AlertDialog>
    )
}
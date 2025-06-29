"use client"

import { toast } from "sonner"
import AvaliarAlbumSheet from "./avaliar-album-sheet"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu"
import { useSession } from "next-auth/react"
import { getUserIdFromSession } from "@/lib/get-user-id-from-session"

interface AlbumProps {
    id: string
    nome: string
    banda: string
    capa: string
    nota: number | undefined
    notaAdicionada: () => void 
}

export function AlbumCard({...props}: AlbumProps){
    const { data: session } = useSession()
    const [nota, setNota] = useState<number | null>(null)
    const [open, setOpen] = useState(false)

    const userId = getUserIdFromSession(session)

    function handleNotaChange(n: number) {
        setNota(n)
    }

    async function deletarAlbum(){
        let bodyContent = JSON.stringify({
            "userId": userId,
            "albumId": props.id
        })

        const albumDelete = await fetch('https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/remover', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })

        const data = await albumDelete.json()

        setOpen(false)
        toast(
            <div className="flex gap-5">
                <p>{props.nome} - {props.banda} foi excluído</p>
            </div>
        )

        if (props.notaAdicionada) props.notaAdicionada()
    }

    async function salvarNota() {
        let bodyContent = JSON.stringify({
            "userId": userId,
            "albumId": props.id,
            "nota": nota
        })

        const notaFinal = await fetch('https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/avaliar',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })
        const data = await notaFinal.json()

        setOpen(false)
        toast(
            <div className="flex gap-5">
                <p>{props.nome} - {props.banda} recebeu nota: {nota}</p>
            </div>
        )

        if (props.notaAdicionada) props.notaAdicionada()
    }
    return(
        <Sheet open={open} onOpenChange={setOpen}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <SheetTrigger>
                        <div className="relative w-60 h-60 rounded-2xl cursor-pointer">
                            <img className="rounded-2xl w-60 h-60" src={props.capa} />
                            {props.nota !== undefined && props.nota !== null && (
                                <div className="absolute top-2 right-2">
                                    <div className=" m-2 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-black to-white rounded-lg opacity-70"></div>
                                        <p className="font-bold opacity-100 text-white absolute">{props.nota}</p>

                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70 rounded-b-2xl">
                                <h3 className="text-xl text-white font-bold truncate">{props.nome}</h3>
                                <p className="mt-2 text-sm text-gray-300">{props.banda}</p>
                            </div>
                        </div>
                    </SheetTrigger> 
                </ContextMenuTrigger>

                <ContextMenuContent>
                    <ContextMenuItem onClick={() => deletarAlbum()} variant="destructive" className="cursor-pointer">Excluir álbum</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Avalie o álbum</SheetTitle>
                </SheetHeader>
                <main>
                    <AvaliarAlbumSheet nome={props.nome} banda={props.banda} capa={props.capa} onNotaChange={handleNotaChange} />
                </main>

                <SheetFooter>
                    <Button className="cursor-pointer" onClick={salvarNota}>Salvar nota</Button>
                    <SheetClose asChild>
                        <Button className="cursor-pointer" variant={"outline"}>Fechar</Button>
                    </SheetClose>
                </SheetFooter>

            </SheetContent>

        </Sheet>

    )
}
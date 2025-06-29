import AvaliarAlbumSheet from "./avaliar-album-sheet"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

interface AlbumProps {
    nome: string
    banda: string
    capa: string
}

export function AlbumCard({...props}: AlbumProps){
    const [nota, setNota] = useState<number | null>(null)
    function handleNotaChange(n: number) {
        setNota(n)
    }
    function salvarNota() {
        console.log("Nota salva:", nota)
    }
    return(
        <Sheet>
            <SheetTrigger>
                <div className="relative w-60 h-60 rounded-2xl cursor-pointer">
                    <img className="rounded-2xl w-60 h-60" src={props.capa} />
                    
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70 rounded-b-2xl">
                        <h3 className="text-xl text-white font-bold truncate">{props.nome}</h3>
                        <p className="mt-2 text-sm text-gray-300">{props.banda}</p>
                    </div>
                </div>
            </SheetTrigger>

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
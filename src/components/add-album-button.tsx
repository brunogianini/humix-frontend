"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { AlbumCard } from "./album-card";

export function AddAlbumButton({ onAlbumAdded }: { onAlbumAdded?: () => void }) {
    const [nome, setNome] = useState("")
    const [banda, setBanda] = useState("")
    const [open, setOpen] = useState(false)

    async function adicionarAlbum(){
        let bodyContent = JSON.stringify({
            "userId": "1",
            "nome": nome,
            "banda": banda
        });
        const album = await fetch('http://localhost:3001/adicionar',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })
        const data = await album.json()

        setOpen(false)
        toast(
            <div className="flex gap-5">
                <img className="rounded-2xl h-25 w-25" src={data.album.capa}/>
                <p>{data.album.nome} - {data.album.banda.nome} foi adicionado</p>
            </div>
        )
        setNome("")
        setBanda("")
        if (onAlbumAdded) onAlbumAdded()

        
    }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Adicionar Álubm</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicione álbums em sua lista</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Nome</Label>
              <Input onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="grid gap-3">
              <Label>Banda</Label>
              <Input onChange={(e) => setBanda(e.target.value)}/>
            </div>
          </div>

          <DialogFooter className="mt-10">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer" onClick={() => {adicionarAlbum()}}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

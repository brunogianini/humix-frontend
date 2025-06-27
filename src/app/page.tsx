'use client'

import { AlbumGrid } from "@/components/album-grid";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface AlbumProps {
  nome: string
  banda: string
  capa: string
}

export default function Home() {
  const [albums, setAlbums] = useState<AlbumProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAlbums(){
    setIsLoading(true)
    const res = await fetch('http://localhost:3001/albums/1')
    const data = await res.json()

    setAlbums(data.albums)
    setIsLoading(false)
  }

  useEffect(() => {
    getAlbums()
  }, [])

  return (
    <div className="m-5 flex gap-5 flex-col w-full max-h-screen">

      <div className="w-full flex justify-end">
        <Button className="cursor-pointer">Adicionar Álbum</Button>
      </div>
      
      {!isLoading && <AlbumGrid albums={albums}/>}
    </div>
  );
}

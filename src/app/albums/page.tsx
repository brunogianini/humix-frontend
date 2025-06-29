'use client'

import { AlbumGrid } from "@/components/album-grid";
import { useEffect, useState } from "react";

interface AlbumProps {
  nome: string
  banda: string
  capa: string
}

export default function Page() {
  const [albums, setAlbums] = useState<AlbumProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAlbums(){
    setIsLoading(true)
    const res = await fetch('http://localhost:3001/avaliacoes/1')
    const data = await res.json()
            setAlbums(data.avaliacoes.map((a: any) => ({
            id: a.album.id, 
            nome: a.album.nome,
            banda: a.album.banda.nome,
            capa: a.album.capa,
            nota: a.nota
        })))

    
    setIsLoading(false)
  }

  useEffect(() => {
    getAlbums()
  }, [])

  return (
    <div className="m-5 flex gap-5 flex-col w-full max-h-screen">
      
      {!isLoading && <AlbumGrid albums={albums} notaAdicionada={getAlbums}/>}
    </div>
  );
}

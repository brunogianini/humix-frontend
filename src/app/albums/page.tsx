'use client'

import { AlbumGrid } from "@/components/album-grid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserIdFromSession } from "@/lib/get-user-id-from-session";


interface AlbumProps {
  nome: string
  banda: string
  capa: string
}

export default function Page() {
  const { data: session } = useSession();
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = getUserIdFromSession(session);

  async function getAlbums() {
    setIsLoading(true);
    if (!userId) return;
    const res = await fetch('http://localhost:3001/avaliacoes/' + userId);
    const data = await res.json();
    setAlbums(data.avaliacoes.map((a: any) => ({
      id: a.album.id,
      nome: a.album.nome,
      banda: a.album.banda.nome,
      capa: a.album.capa,
      nota: a.nota
    })));
    setIsLoading(false);
  }

  useEffect(() => {
    if (userId) getAlbums();
  }, [session])

  return (
    <div className="m-5 flex gap-5 flex-col w-full max-h-screen">
      
      {!isLoading && <AlbumGrid albums={albums} notaAdicionada={getAlbums}/>}
    </div>
  );
}

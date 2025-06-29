"use client"

import { AddAlbumButton } from "@/components/add-album-button"
import { AlbumGrid } from "@/components/album-grid"
import { getUserIdFromSession } from "@/lib/get-user-id-from-session"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface AlbumProps {
  nome: string
  banda: string
  capa: string
}

export default function NaoOuvido(){
    const { data: session } = useSession()
    const [albums, setAlbums] = useState<AlbumProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const userId = getUserIdFromSession(session)

    async function getAlbums(){
        setIsLoading(true)
        const res = await fetch('http://localhost:3001/albums/' + userId)
        const data = await res.json()
        setAlbums(data.albums)
        
        setIsLoading(false)
    }
    
    useEffect(() => {
        getAlbums()
    }, [session])

    return(
        <div className="m-5 flex gap-5 flex-col w-full max-h-screen">   
            <div className="w-full flex justify-end">
                <AddAlbumButton onAlbumAdded={getAlbums}/>
            </div>   

            {!isLoading && <AlbumGrid albums={albums} notaAdicionada={getAlbums}/>}
        </div>
    )
}
'use client'

import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import { Album } from "@/entities/album.entity";
import Cookies from 'js-cookie';
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    tipo: number
}


export default function AlbumGrid({ tipo }: Props) {
    const [albums, setAlbums] = useState<Album[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    let url = ""

    if (tipo == 0) {
        url = 'http://localhost:4000/api/user/albums/'
    } else {
        url = 'http://localhost:4000/api/user/albums/rated'
    }

    async function getAlbums() {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado.');
        }

        try{
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    "Access-Control-Allow-Origin": '*'
                },
                cache: 'no-store',
            })
    
            const data = await res.json()
            setAlbums(data)
        } finally {
            setLoading(false)
        }
        

    }

    useEffect(() => {
        getAlbums()
    }, [])

    return (
        <main className="flex gap-5 flex-wrap">

            {loading ? (
                Array.from({ length: 18 }).map((_, index) => (
                    <Skeleton key={index} className="relative max-w-sm group w-[243px] h-[243px] rounded-md" />
                ))
            ) : (
                albums.map((album, key) => (
                    <AlbumCard
                        songs={album.songs}
                        key={key}
                        nome={album.nome}
                        id={album.id}
                        capa={album.capa}
                        link={album.link}
                        banda={album.banda}
                        nota={0}
                        ratings={album.ratings}
                    />
                ))
            )}
        </main>
    );
}

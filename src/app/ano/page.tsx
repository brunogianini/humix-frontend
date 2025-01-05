'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Album } from "@/entities/album.entity";
import AlbumCard from "@/components/AlbumCard";


export default function Home() {

    const [albums, setAlbums] = useState<Album[]>([])
    const [count, setCount] = useState(0)

    async function getAlbums() {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado.');
        }

        try {
            const res = await fetch('https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/api/user/albums/by_date', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    "Access-Control-Allow-Origin": '*'
                },
                cache: 'no-store',
            })

            const data = await res.json()
            setCount(data.length)
            setAlbums(data)
        } finally {

        }


    }

    useEffect(() => {
        getAlbums()
    }, [])

    return (
        <>
        <p>{count}/365</p>
        <main className="flex gap-5 flex-wrap">
            
            {albums.map((album, key) => (
                <div key={album.id}>
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
                </div>
                
            ))}

        </main>
        </>
        
    );
}

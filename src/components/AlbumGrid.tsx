'use client'

import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import { Album } from "@/entities/album.entity";
import Cookies from 'js-cookie';

export default function AlbumGrid() {
    const [albums, setAlbums] = useState<Album[]>([])

    async function getAlbums() {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado.');
        }

        const res = await fetch('http://localhost:4000/api/user/albums/', {
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

    }

    useEffect(() => {
        getAlbums()
    }, [])

    return (
        <main className="flex gap-5 flex-wrap">
            {albums.map((album, key) => (
                <AlbumCard key={key} nome={album.nome} id={album.id} capa={album.capa} link={album.link} banda={album.banda} nota={0} ratings={[]} />
            ))}
        </main>
    );
}

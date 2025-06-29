"use client"

import { useEffect, useState } from "react"
import UserCard from "./user-card"
import { useSession } from "next-auth/react"
import { getUserIdFromSession } from "@/lib/get-user-id-from-session"

interface UsuarioProps {
    id: string
    nome: string
    foto: string
    isFollower: boolean
}

export default function MeusSeguidoresGrid(){
    const { data: session } = useSession()
    const [users, setUsers] = useState([])

    const userId = getUserIdFromSession(session)

    async function getUsers(){
        const res = await fetch("http://localhost:3001/seguidos/" + userId)
        const data = await res.json()

        setUsers(data.usuarios)
    }

    useEffect(() => {
        if (userId) getUsers()
    }, [session])

    return(
        <main className="flex m-5 gap-5">
            {users.map((usuario: UsuarioProps, key) => (
                <UserCard userId={userId ?? ""} onUserFollow={getUsers} key={usuario.id} id={usuario.id} nome={usuario.nome} foto={"https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3383.jpg?semt=ais_hybrid&w=740"} seguindo={true} me_segue={usuario.isFollower} />
            ))}
        </main>
    )
}
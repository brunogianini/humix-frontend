'use client'

import BandasGrid from "@/components/bandas-grid";
import { getUserIdFromSession } from "@/lib/get-user-id-from-session";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
    const { data: session } = useSession()
    const [bandas, setBandas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const userId = getUserIdFromSession(session)

    async function getBandas(){
        setIsLoading(true)
        const res = await fetch('https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/bandas/' + userId)
        const data = await res.json()

        setBandas(data.bandas)
        setIsLoading(false)
    }

    useEffect(() => {
        if (userId) getBandas()
    }, [session])
    return (
        <main className="w-full m-5">
            {!isLoading && <BandasGrid bandas={bandas}/>}
        </main>
    )
}
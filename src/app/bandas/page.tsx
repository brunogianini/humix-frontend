'use client'

import BandasGrid from "@/components/bandas-grid";
import { useEffect, useState } from "react";

export default function Page() {
    const [bandas, setBandas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function getBandas(){
        setIsLoading(true)
        const res = await fetch('http://localhost:3001/bandas/1')
        const data = await res.json()

        setBandas(data.bandas)
        setIsLoading(false)
    }

    useEffect(() => {
        getBandas()
    }, [])
    return (
        <main className="w-full m-5">
            {!isLoading && <BandasGrid bandas={bandas}/>}
        </main>
    )
}
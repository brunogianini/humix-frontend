"use client"

import { Star } from "lucide-react";
import { useState } from "react";

export default function StarRating(){
    const [nota, setNota] = useState(0)
    const [notaEscolhida, setNotaEscolhida] = useState<number | null>(null)
    const estrelas = Array.from({ length: 10 }, (_, i) => i + 1)

    function atualizarNota(nota: number){
        setNota(nota)
    }

    function escolherNota(nota: number) {
        setNotaEscolhida(nota)
        setNota(nota)
    }

    function resetarNota(){
        if(notaEscolhida !== null){
            setNota(notaEscolhida)
        } else {
            setNota(0)
        }
    }

    return(
        <div onMouseLeave={resetarNota} className="flex flex-row w-full justify-between">
            {estrelas.map((number) => (
                <Star
                    onClick={() => escolherNota(number)}
                    className={nota >= number ? 'fill-amber-300 cursor-pointer': 'cursor-pointer'}
                    key={number}
                    onMouseEnter={() => atualizarNota(number)}
                />
            ))}
        </div>
    )
}
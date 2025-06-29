"use client"

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
    onChange?: (nota: number) => void;
}

export default function StarRating({ onChange }: StarRatingProps){
    const [nota, setNota] = useState(0)
    const [notaEscolhida, setNotaEscolhida] = useState<number | null>(null)
    const estrelas = Array.from({ length: 10 }, (_, i) => i + 1)

    function atualizarNota(nota: number){
        setNota(nota)
    }

    function escolherNota(nota: number) {
        setNotaEscolhida(nota)
        setNota(nota)
        if (onChange) onChange(nota)
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
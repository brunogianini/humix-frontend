'use client'

import { useEffect, useState } from "react"

interface Avaliacao {
    // Define properties of Avaliacao as needed, using 'any' if unknown
    [key: string]: any;
}

interface albumProps{
    capa: string;
    avaliacoes: Avaliacao[];
}

interface bandasProps{
    nome: string;
    foto: string;
    albums: albumProps[];
}

export default function BandasCard({...props}: bandasProps){
    const [media, setMedia] = useState(0)

    function calcularMedia(){
        let soma = 0
        let n = props.albums.length
        props.albums.forEach(album => {
            
            album.avaliacoes.forEach((avaliacao: any) => {
                soma += avaliacao.nota
            })
        })

        setMedia(soma / n)
    }

    useEffect(() => {
        calcularMedia()
    }, [])

    
    return(
        <div className="w-ful border h-25 rounded-2xl flex items-center p-3 gap- justify-between">

            <div className="flex items-center gap-5">
                <img className="h-20" src={props.foto} alt="" />
                {props.nome}
                <p className="ml-5">média de notas: {media}</p>
            </div>
            
            <div className="flex gap-5">
                {props.albums.map((album: albumProps, key) => (
                    <img className="h-20" key={key} src={album.capa} alt="" />
                ))}
            </div>

        </div>
    )
}
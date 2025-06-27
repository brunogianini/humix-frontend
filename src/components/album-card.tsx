interface AlbumProps {
    nome: string
    banda: string
    capa: string
}

export function AlbumCard({...props}: AlbumProps){
    return(
        <div className="relative w-60 rounded-2xl">
            <img className="rounded-2xl" src={props.capa} />
            
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70 rounded-b-2xl">
                <h3 className="text-xl text-white font-bold">{props.nome}</h3>
                <p className="mt-2 text-sm text-gray-300">{props.banda}</p>
            </div>
        </div>
    )
}
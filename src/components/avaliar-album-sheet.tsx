import StarRating from "./star-rating"

interface AlbumProps {
    nome: string
    banda: string
    capa: string
    onNotaChange?: (nota: number) => void
}

export default function AvaliarAlbumSheet({...props}: AlbumProps){
    return (
        <div className="flex w-full flex-col items-baseline">
            <img src={props.capa} className="p-5"/>
            <div className="pl-5 w-full">
                <p>{props.nome}</p>
                <p>{props.banda}</p>
                <div className="mt-5 w-full pr-5">
                    <StarRating onChange={props.onNotaChange} />
                </div>
            </div>
            
        </div>
    )
}
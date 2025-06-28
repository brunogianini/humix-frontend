interface bandasProps{
    nome: string
    foto: string
    albums: []
}

interface albumProps{
    capa: string
}

export default function BandasCard({...props}: bandasProps){
    return(
        <div className="w-ful border h-25 rounded-2xl flex items-center p-3 gap- justify-between">

            <div className="flex items-center gap-5">
                <img className="h-20" src={props.foto} alt="" />
                {props.nome}
            </div>
            
            <div className="flex gap-5">
                {props.albums.map((album: albumProps, key) => (
                    <img className="h-20" key={key} src={album.capa} alt="" />
                ))}
            </div>

        </div>
    )
}
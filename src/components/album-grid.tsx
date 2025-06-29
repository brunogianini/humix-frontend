import { AlbumCard } from "./album-card";

interface AlbumsPros {
    albums: any[]
    notaAdicionada: () => void
}

export function AlbumGrid({...props}: AlbumsPros){
    return(
        <main className="flex  gap-5 flex-wrap pb-5">

            {props.albums.map((album, inx) => (
                <AlbumCard notaAdicionada={props.notaAdicionada} key={inx} id={album.id} nome={album.nome} banda={album.banda.nome} capa={album.capa} nota={album.nota} />
            ))}
            
        </main>
    )
}
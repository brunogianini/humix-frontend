import { Album } from "@/entities/album.entity";

export default function AlbumDetails({ ...props }: Album) {
    return (
        <main className="flex items-center justify-center">
            {props.nome}
            {props.banda.nome}
        </main>
    )
}
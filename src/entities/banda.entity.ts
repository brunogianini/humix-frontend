import { Album } from "./album.entity"

export interface Banda{
    id: number
    nome: string
    albums: Album[]
    foto: string
}

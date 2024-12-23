import { Banda } from "./banda.entity"

export interface Album{
    id: number
    nome: string
    capa: string
    link: string
    banda: Banda
    nota: number
    songs?: Track[]
    ratings: {
        id: number;
        userId: number;
        nota: number;
        createdAt: string;
      }[]
}

export interface Track{
    name: String,
    link: String
}

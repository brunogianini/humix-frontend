"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Album } from "@/entities/album.entity";
import { Card, CardContent } from "./ui/card";
import AlbumDetails from "./AlbumDetails";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

export default function AlbumCard({ ...props }: Album) {
    let tem_nota = false

    if (props.ratings.length == 0) {

    } else {
        tem_nota = true
    }




    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Card className="relative max-w-sm group w-[243px] h-[243px] rounded-md">

                        <CardContent className="p-0">
                            <div className="relative aspeact-squre flex justify-end">

                                {
                                    tem_nota ?

                                        <div className="absolute flex">
                                            <div className=" m-2 flex items-center justify-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-black to-white rounded-lg opacity-70"></div>
                                                <p className="font-bold opacity-100 text-white absolute">{props.ratings[0].nota}</p>

                                            </div>
                                        </div>

                                        : <></>
                                }

                                <img src={props.capa} className="rounded-md"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-start">
                                    <h3 className="text-start text-xl font-bold text-white mb-1 line-clamp-1">{props.nome}</h3>
                                    <p className="text-sm text-gray-200 line-clamp-1">{props.banda.nome}</p>
                                </div>
                            </div>

                        </CardContent>
                    </Card>




                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-screen w-[1500px] h-[800px]">
                    <AlertDialogTitle hidden className="">Dar nota</AlertDialogTitle>
                    <AlbumDetails id={props.id} nome={props.nome} capa={props.capa} link={props.link} banda={props.banda} nota={props.nota} ratings={props.ratings} />
                </AlertDialogContent>
            </AlertDialog>

        </>



    );
}

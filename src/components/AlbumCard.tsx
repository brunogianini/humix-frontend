import { Album } from "@/entities/album.entity";
import { Card, CardContent } from "./ui/card";

export default function AlbumCard({ ...props }: Album) {
    return (
        <Card className="relative max-w-sm group w-[245px] h-[245px]">
            <CardContent className="p-0">
                <div className="relative aspect-square flex justify-end">
                    <img src={props.capa} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{props.nome}</h3>
                        <p className="text-sm text-gray-200 line-clamp-1">a</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}

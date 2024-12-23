import { Album } from "@/entities/album.entity";
import { Separator } from "./ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import AlbumRating from "./AlbumRating";
import { Label } from "./ui/label";
import { AlertDialogCancel } from "./ui/alert-dialog";

export default function AlbumDetails({ ...props }: Album) {
    const hasRating = props.ratings.length > 0

    return (
        <main className="flex flex-col lg:flex-row items-start justify-between p-5 gap-6">
            <div className="flex justify-start items-start flex-col gap-10">
                <img
                    src={props.capa}
                    alt={`${props.nome} cover`}
                    className="w-full max-w-xs h-auto rounded-lg shadow-lg object-cover"
                />
                <div className="flex gap-5 flex-col">
                    <Label className="text-2xl font-bold">Nota</Label>
                    <AlbumRating nota={hasRating ? props.ratings[0].nota : 0} id={props.id}/>
                </div>
                
            </div>

            <div className="flex-grow flex flex-col justify-center items-start space-y-4">
                <p className="text-2xl font-bold">{props.nome}</p>
                <p className="text-sm text-gray-600">{props.banda.nome}</p>
                <Separator className="mt-4" />
                <div className="w-full max-h-[500px] overflow-auto rounded-md">
                    <ScrollArea className="h-full">
                        <Table className="mt-4 w-full">
                            <TableCaption>Músicas do Álbum</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {props.songs.map((song, key) => (
                                    <TableRow key={key}>
                                        <TableCell className="font-medium">{key + 1}</TableCell>
                                        <TableCell className="font-medium">{song.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </div>

            <AlertDialogCancel>
                X
            </AlertDialogCancel>
        </main>
    )
}
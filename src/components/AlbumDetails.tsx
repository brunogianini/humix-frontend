import { Album } from "@/entities/album.entity";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Button } from "./ui/button";

export default function AlbumDetails({ ...props }: Album) {
    return (
        <main className="flex items-center justify-center flex-col">
            {props.nome}
            {props.banda.nome}
            <AlertDialogCancel>
                <Button variant={"secondary"}>Fechar</Button>
            </AlertDialogCancel>
        </main>
    )
}
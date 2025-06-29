import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface UsuarioProps {
    userId: string
    id: string
    nome: string
    foto: string
    seguindo: boolean
    me_segue: boolean
    onUserFollow: () => void
}

export default function UserCard({...props}: UsuarioProps){
    async function seguirUsuario(){
        let bodyContent = JSON.stringify({
            "userId": props.userId,
            "alvoId": props.id
        })

        const seguir = await fetch('http://localhost:3001/seguir',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        })
        const data = await seguir.json()
        if (props.onUserFollow) props.onUserFollow()
    }
    return(
        <div className="h-25 w-80 rounded-2xl border-2 flex items-center p-2 gap-5">
            <img className="h-20" src={props.foto} alt="" />
            <div>
                {props.nome}
                {props.me_segue? <Badge>Te segue</Badge> : ""}
            </div>
            {props.seguindo ? "" : <Button className="cursor-pointer" onClick={seguirUsuario}>Seguir</Button>}
            
        </div>
    )
}
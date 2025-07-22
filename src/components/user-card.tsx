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

        const seguir = await fetch('https://bumpy-unicorn-brunogianini-8376417b.koyeb.app/seguir',{
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
        <div className="h-20 w-120 rounded-2xl border-2 flex items-center justify-between p-2 gap-5">
            <div className="flex flex-row gap-5 items-center">
                <img className="h-15" src={props.foto} alt="" />
                <div className="flex flex-col">
                    {props.nome}
                    {props.me_segue? <Badge>Te segue</Badge> : ""}
                </div>
            </div>

            {props.seguindo ? <Button disabled className="cursor-pointer mr-5" onClick={seguirUsuario}>Seguindo</Button> : <Button className="cursor-pointer mr-5" onClick={seguirUsuario}>Seguir</Button>}
            
        </div>
    )
}
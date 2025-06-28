import BandasCard from "./bandas-card";

interface BandaProps {
    bandas: any[]
}

export default function BandasGrid({...props}: BandaProps){
    return(
        <main className="w-full flex flex-col gap-5">
            {props.bandas.map((banda, key) => (
                <BandasCard key={key} nome={banda.nome} foto={banda.foto} albums={banda.albums} />
            ))}
        </main>
    )
}
import BandasCard from "./bandas-card";

export default function BandasGrid(){
    return(
        <main className="w-full m-5 flex flex-col gap-5">
            <BandasCard />
            <BandasCard />
        </main>
    )
}
import {useFetch} from '../hooks/useFetch'

interface DescripcionProps{
    libro_key: string
}

const descripcionParseada = (description: unknown): string =>{ /*tiene que respetar el nombre de lo que me trae la API*/

    if (!description) return "descripcion no disponible"   
    if (typeof description === "string") return description
    if (typeof description === "object" && "value" in description){
        return (description as {value: string}).value
    }
    return "descripcion no disponible"
}

function Descripcion({libro_key}:DescripcionProps){

    const {data: descripcion, loading, error}= useFetch<{description?:string | {value: string}}>(`https://openlibrary.org/works/${libro_key}.json`); /*"" ""*/

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
    )

    if (error) return(
        <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700">
            {error}
        </div>
    )

    else return(<p>{descripcionParseada(descripcion?.description)}</p>) /*le pongo ? porque cuando lo definí puse que podía no estar*/
}

export default Descripcion;
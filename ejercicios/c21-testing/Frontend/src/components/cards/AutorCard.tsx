import type {Autor as AutorAPI} from '../../types/Autor.ts';
import type { AutorBD } from '../../types/bd/autor.bd.ts';
import type { AutorCreate } from '../../types/bd/bd.create.ts';

import { useGet } from '../../hooks/useGet.ts';
import { usePost } from '../../hooks/usePost.ts';



type AutorCardProps={
    autor_key:string
}

function AutorCard({autor_key}: AutorCardProps){

    const {data: autor_api, loading: loading_api, error: error_api}= useGet<AutorAPI>(`https://openlibrary.org/authors/${autor_key}.json`);
    const { data: data_bd, loading: loading_bd, error: error_bd, post } = usePost<AutorBD, AutorCreate>(`/autores`);
    
    if (loading_api) return (
        <div className="flex justify-center items-center h-40">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
        </div>
    )

    if (error_api) return(
        <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700">
            {error_api}
        </div>
    )

    if (!autor_api) return null

    else return(
        <>
            <div className='flex flex-row gap-6'>
                <div>
                    <h5>{autor_api.personal_name??autor_api.name}</h5>
                    <p>fecha de nacimiento: {autor_api.birth_date?? "no registrada"}</p>
                </div>
                <button className='boton' onClick={()=>post(
                    {
                        id: autor_api.key.split("/")[2],
                        nombre: autor_api.personal_name ?? autor_api.name ?? "Desconocido",
                        fecha_nacimiento: autor_api.birth_date ?? null
                    }
                )}>
                guardar
                {
                    (loading_bd)&&        
                    <div className="flex justify-center items-center h-40">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
                    </div>
                }
                {
                    (error_bd)&&
                    <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700">
                        {error_bd}
                    </div>
                }
                {                    
                    (data_bd)&&
                    <div className="rounded-md border border-green-300 bg-green-100 p-4 text-green-700">
                        Guardado con éxito
                    </div>
                }

                </button>
            </div>
        </>
    )
}

export default AutorCard;
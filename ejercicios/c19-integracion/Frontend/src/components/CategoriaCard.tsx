import type {Categoria as CategoriaAPI} from '../types/Categoria.ts';
import type { CategoriaBD } from '../types/bd/categoria.bd.ts';
import type { CategoriaCreate } from '../types/bd/bd.create.ts';

import { useGet } from '../hooks/useGet.ts';
import { usePost } from '../hooks/usePost.ts';

type CategoriaCardProps={
    categoria_key:string
}

function CategoriaCard({categoria_key}: CategoriaCardProps){

    const {data: categoria_api, loading: loading_api, error: error_api}= useGet<CategoriaAPI>(`https://openlibrary.org/subjects/${categoria_key}.json`);

    const { data: data_bd, loading: loading_bd, error: error_bd, post } = usePost<CategoriaBD, CategoriaCreate>(`${import.meta.env.VITE_API_URL}/categorias`);

    
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

    if (!categoria_api) return null

    else return(
        <>
            <div className="text-xs flex flex-col h-[110px] border border-1 rounded-md">
                <h5>{categoria_api.name}</h5>
                <p>obras asociadas: {categoria_api.work_count}</p>
                <button className='boton' onClick={()=>post(
                    {
                        id: categoria_api.key.split("/")[2],
                        obras_asociadas: categoria_api.work_count
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

export default CategoriaCard;
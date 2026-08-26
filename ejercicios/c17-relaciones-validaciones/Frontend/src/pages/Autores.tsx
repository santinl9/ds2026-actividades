import type { AutorBD } from "../types/bd/autor.bd";

import Card from "../components/AutorCard.bd"

import { useGet } from "../hooks/useGet";

function Autores(){

    const {data: autores, loading: loading_bd, error: error_bd}= useGet<AutorBD[]>(`http://localhost:3000/api/autores`);

    return(
        <>
            <div className="fondo">
                <div className="container mx-auto px-4">
                    <nav className="flex flex-col gap-4 rounded-lg p-4 shadow md:flex-row md:items-center md:justify-between header-footer">
                        <h1 className="text-xl font-semibold">Libros Guardados</h1>
                    </nav>
                </div>

                {
                    (autores)
                    &&
                    <div className='flex flex-row flex-wrap justify-start gap-2'>{
                        autores.map( (autor)=>(
                            <Card {...autor}/>
                        ))
                    }
                    </div>
                }
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
                    
            
            </div>
        </>
    )
}

export default Autores
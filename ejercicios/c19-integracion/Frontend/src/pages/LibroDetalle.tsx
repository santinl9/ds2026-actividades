import { useParams, Link } from 'react-router-dom';
import {useGet} from '../hooks/useGet'
import { usePost } from '../hooks/usePost';

import type { Libro as LibroAPI } from '../types/Libro'
import type { LibroCreate } from '../types/bd/bd.create';
import type { LibroBD } from '../types/bd/libro.bd';

import AutorCard from '../components/AutorCard'
import CategoriaCard from '../components/CategoriaCard'




const descripcionParseada = (description: unknown): string =>{ /*tiene que respetar el nombre de lo que me trae la API*/

    if (!description) return "descripcion no disponible"   
    if (typeof description === "string") return description
    if (typeof description === "object" && "value" in description){
        return (description as {value: string}).value
    }
    return "descripcion no disponible"
}


function LibroDetalle(){

    const { cover_i, libro_key}= useParams<{
        cover_i: string;
        libro_key:string
    }>()

    const idObra = libro_key?.split("/")[2] ?? "";
    const {data: libro_api, loading: loading_api, error: error_api}= useGet<LibroAPI>(idObra ? `https://openlibrary.org/works/${idObra}.json` : "");

    const { data: data_bd, loading: loading_bd, error: error_bd, post } = usePost<LibroBD, LibroCreate>(`${import.meta.env.VITE_API_URL}/libros`);

    const imagen_url= `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    const precio = (Math.random() * 5000).toFixed(2)
    
    return(
        <>
        <div className="fondo">
            <div className="flex flex-row justify-evenly flex-wrap bg-[#1a1a1a]">
                <img src={imagen_url} className='w-[300px]'></img>
                <div className="flex flex-col max-w-[600px] gap-4">
                    {
                        (loading_api)&&        
                        <div className="flex justify-center items-center h-40">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
                        </div>
                    }
                    {
                        (error_api)&&
                        <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700">
                            {error_api}
                        </div>
                    }
                    {
                        (libro_api)&&
                        <>
                            <div className='flex flex-col items-center'>
                                <h1>Titulo: {libro_api.title}</h1>
                                <div>
                                    <h2>Descripcion:</h2>
                                    <p>{descripcionParseada(libro_api.description)}</p>
                                </div>
                            </div>
                            <div className='border-t border-t-gray-700'>
                                <h4>Autor:</h4>
                                {
                                    (libro_api.authors 
                                    &&<AutorCard
                                        key={libro_api.authors[0]?.author.key.split("/")[2]}
                                        autor_key={libro_api.authors[0]?.author.key.split("/")[2]}
                                    />
                                    )
                                    || <p>Anónimo</p>
                                }
                            </div>
                            <div className='border-t border-t-gray-700'>
                                <h4>Categorias:</h4>
                                <div className='flex flex-row gap-1'>
                                    {
                                        (libro_api.subjects?.slice(0,5)?? []).map( (categoria)=>( 
                                            <CategoriaCard 
                                                key={categoria}
                                                categoria_key={categoria}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </> 
                    }
                    
                </div>
            </div>
            <div className='flex flex-row justify-center flex-wrap gap-3'>
                <p>${precio}</p>
                <button className="boton w-screen">Comprar</button>
                <button className='boton' 
                    onClick={()=> {
                        if (!libro_api) return;
                        post(
                            {
                                id: libro_api.key.split("/")[2],
                                titulo: libro_api.title,
                                imagen_url: imagen_url,
                                precio: Number(precio),
                                categorias: libro_api.subjects?.slice(0,4) ?? [],
                                autor_id: libro_api.authors?.[0]?.author?.key ? libro_api.authors[0].author.key.split("/")[2] : null,
                                descripcion: descripcionParseada(libro_api.description)

                            }
                        );
                    }}>
                    Guardar
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
                <Link to="/Catalogo" className="boton">Ir al catálogo</Link>
            </div>
        </div>
        </>
    )


};

export default LibroDetalle;

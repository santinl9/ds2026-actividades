import Card from '../components/LibroCard.tsx';
import type {Libro} from '../types/Libro.ts'
import { useFetch } from '../hooks/useFetch.ts';

function Tendencias(){
    const {data: libros, loading, error}= useFetch<{docs: Libro[]}>("https://openlibrary.org/search.json?q=love&sort=rating+desc&limit=6&fields=title,author_name,cover_i,key");
    
    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
        </div>
    )

    if (error) return(
        <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700">
            {error}
        </div>
    )

    else return(
        <>
            <div className='flex flex-row flex-wrap justify-center'>{
                    (libros?.docs ?? []).map( (libro)=>( //Uso map porque tsx espera que el código entre llaves devuelva algo, MAP devuelve una nueva colección
                        <Card 
                            key={libro.key}//es una key que maneja React internamente
                            cover_i={libro.cover_i} 
                            title={libro.title} 
                            author_name={libro.author_name} 
                            libro_key={libro.key} 
                        />
                    ))
            }</div>
        </>
    )
}

export default Tendencias;
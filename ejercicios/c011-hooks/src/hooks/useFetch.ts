import { useState, useEffect } from "react";

export function useFetch<T>(url:string){ /*"T" representa un tipo de dato genérico*/
    //`https://openlibrary.org/search.json?q=love&sort=rating+desc&limit=6&fields=title,author_name,cover_i,key` para los 6 libros
    const[data, setData] = useState<T|null>(null);
    const[loading, setLoading] = useState<boolean>(false);
    const[error, setError] = useState<string | null> (null);


    useEffect(()=>{ //useEffect se ejecuta una vez que se renderiza toda la página, sirve para ejecutar operaciones en segundo plano

        async function cargar(){
            try{
                setLoading(true);
                setError(null);
                const salida = await fetch(url)
                if (!salida.ok){throw new Error(`error en la solicitud ${salida.status}`);}
                setData( await salida.json())
            }
            catch(e){
                setError(e instanceof Error? e.message : "error desconocido");
            }
            finally{
                setLoading(false);
            }

        }
        cargar()

    },[url])

    return {data, loading, error};
}
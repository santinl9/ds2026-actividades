import { useState, useEffect } from "react";
//useGet usa useEffect porque los datos se suelen pedir cuando el componente se termina de renderizar, no "cuando el usuario quiere"

import { parseErrorResponse } from "../functions/parseErrorResponse";
export function useGet<T>(url:string){ 

    const[data, setData] = useState<T|null>(null);
    const[loading, setLoading] = useState<boolean>(false);
    const[error, setError] = useState<string | null> (null);

    useEffect(()=>{ //useEffect se ejecuta una vez que se renderiza toda la página, sirve para ejecutar operaciones en segundo plano

        async function cargar(){
            try{
                setLoading(true);
                setError(null);
                const salida = await fetch(url)
                if (!salida.ok){
                    throw new Error(await parseErrorResponse(salida)); //sin esta función me perdería la información del body que me trae Next
                }
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
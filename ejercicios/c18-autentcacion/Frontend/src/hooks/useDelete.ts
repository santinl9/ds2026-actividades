import { useState } from "react";
import { parseErrorResponse } from "../functions/parseErrorResponse";

export function useDelete(url: string) {

    const [data, setData] = useState<boolean>(false); //no hay body que parsear en un DELETE
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    

    async function remove() {
        try {
            setData(false)
            setLoading(true);
            setError(null);

            const salida = await fetch(url, {
                method: "DELETE"
            });

            if (!salida.ok){
                throw new Error(await parseErrorResponse(salida));
            }
            setData(true)
        }
        catch (e) {
            setError(e instanceof Error ? e.message : "error desconocido");
        }
        finally {
            setLoading(false);
        }
    }

    return { data, loading, error, remove };
}
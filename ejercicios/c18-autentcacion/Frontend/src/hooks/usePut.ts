import { useState } from "react";
import { parseErrorResponse } from "../functions/parseErrorResponse";

export function usePut<T, B>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function put(body: B) {
        try {
            setLoading(true);
            setError(null);

            const salida = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!salida.ok){
                throw new Error(await parseErrorResponse(salida));
            }

            setData(await salida.json());
        }
        catch (e) {
            setError(e instanceof Error ? e.message : "error desconocido");
        }
        finally {
            setLoading(false);
        }
    }

    return { data, loading, error, put };
}
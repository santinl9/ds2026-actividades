import { useState } from "react";
import { apiFetch } from "../services/api";

export function usePut<T, B>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function put(body: B) {
        try {
            setLoading(true);
            setError(null);
            const res = await apiFetch<T>(url, {
                method: "PUT",
                body: JSON.stringify(body)
            });
            setData(res);
            return res;
        } catch (e) {
            setError(e instanceof Error ? e.message : "error desconocido");
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, put };
}
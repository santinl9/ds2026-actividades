import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

export function useGet<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;
        async function cargar() {
            try {
                setLoading(true);
                setError(null);
                setData(await apiFetch<T>(url));
            } catch (e) {
                setError(e instanceof Error ? e.message : "error desconocido");
            } finally {
                setLoading(false);
            }
        }
        cargar();
    }, [url]);

    return { data, loading, error };
}
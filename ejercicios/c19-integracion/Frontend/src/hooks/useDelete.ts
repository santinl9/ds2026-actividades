import { useState } from "react";
import { apiFetch } from "../services/api";

export function useDelete(url: string) {
    const [data, setData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function remove() {
        try {
            setData(false);
            setLoading(true);
            setError(null);
            await apiFetch(url, {
                method: "DELETE"
            });
            setData(true);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : "error desconocido");
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, remove };
}
import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

export function useFetch<T>(ruta: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch<T>(ruta);
        if (isMounted) setData(res);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [ruta]);

  return { data, loading, error };
}

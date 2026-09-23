import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  
  const esUrlExterna = ruta.startsWith("http://") || ruta.startsWith("https://");
  const url = esUrlExterna ? ruta : `${BASE}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;

  const token = obtenerToken();
  const res = await fetch(url, {
    ...opciones,
    headers: {
      ...(esUrlExterna ? {} : { 'Content-Type': 'application/json' }),
      ...(!esUrlExterna && token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers, //cómo funciona esto de las opciones?
    },
  });

  const cuerpo = await res.json().catch(() => null);
  if (!res.ok) throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  return cuerpo as T;
}
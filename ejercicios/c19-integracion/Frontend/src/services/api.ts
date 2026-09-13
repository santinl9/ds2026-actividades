import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = obtenerToken();
  const url = ruta.startsWith("http://") || ruta.startsWith("https://")
    ? ruta
    : `${BASE}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;

  const res = await fetch(url, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  const cuerpo = await res.json().catch(() => null);

  if (!res.ok) {
    let msg = cuerpo?.error;
    if (!msg && cuerpo?.detalles?.length) {
      msg = cuerpo.detalles
        .map((d: { campo: string; mensaje: string }) => `${d.campo}: ${d.mensaje}`)
        .join(" | ");
    }
    throw new Error(msg ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}

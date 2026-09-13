import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const esUrlExterna = ruta.startsWith("http://") || ruta.startsWith("https://");
  const esApiPropia = !esUrlExterna || (Boolean(BASE) && ruta.startsWith(BASE));

  const url = esApiPropia && !esUrlExterna
    ? `${BASE}${ruta.startsWith("/") ? ruta : `/${ruta}`}`
    : ruta;

  const headers = new Headers(opciones.headers);

  // El token JWT y Content-Type por defecto SOLO se envían a nuestra propia API
  // Evita preflights y bloqueos de CORS en APIs externas como OpenLibrary
  if (esApiPropia) {
    const token = obtenerToken();
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (opciones.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const res = await fetch(url, {
    ...opciones,
    headers,
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


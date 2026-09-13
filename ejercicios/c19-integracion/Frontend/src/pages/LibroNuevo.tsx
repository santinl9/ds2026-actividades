import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../services/api";
import { obtenerToken } from "../services/sesion";

interface LibroNuevoForm {
  id: string;
  titulo: string;
  precio: number;
  imagen_url: string;
  descripcion?: string;
}

function LibroNuevo() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LibroNuevoForm>({
    defaultValues: {
      id: "OL" + Math.floor(10000 + Math.random() * 90000) + "W",
      precio: 1500,
      imagen_url: "https://covers.openlibrary.org/b/id/10521270-M.jpg"
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const token = obtenerToken();

  async function onSubmit(datos: LibroNuevoForm) {
    try {
      setLoading(true);
      setErrorServidor(null);
      setMensajeExito(null);

      const body = {
        ...datos,
        precio: Number(datos.precio),
        categorias: []
      };

      await apiFetch("/libros", {
        method: "POST",
        body: JSON.stringify(body)
      });

      setMensajeExito("¡Libro creado exitosamente (201 Created)!");
      setTimeout(() => {
        navigate("/Libros");
      }, 1500);
    } catch (err) {
      setErrorServidor(err instanceof Error ? err.message : "Error al guardar el libro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fondo min-h-screen py-8">
      <div className="container mx-auto max-w-lg px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="titulo">Alta de Libro</h1>
          <Link to="/Libros" className="boton text-xs">
            ← Volver a Libros
          </Link>
        </div>

        <div className="mb-4 rounded-md border border-gray-700 bg-gray-900/60 p-3 text-xs text-gray-300">
          <span>Estado de sesión: </span>
          {token ? (
            <span className="text-green-400 font-semibold">Token presente en localStorage</span>
          ) : (
            <span className="text-yellow-400 font-semibold">Sin token (modo anónimo - 401 esperado)</span>
          )}
        </div>

        <div className="header-footer rounded-lg p-6 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label htmlFor="id" className="etiqueta block mb-1">
                Identificador (Formato OpenLibrary: OL...W)
              </label>
              <input
                {...register("id", {
                  required: "El ID es obligatorio",
                  pattern: {
                    value: /^OL.*W$/,
                    message: "Debe comenzar con 'OL' y terminar con 'W'"
                  }
                })}
                type="text"
                id="id"
                className="w-full campo"
                disabled={loading}
              />
              {errors.id && (
                <p className="text-[#DC3545] text-sm mt-1">{errors.id.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="titulo" className="etiqueta block mb-1">
                Título del Libro
              </label>
              <input
                {...register("titulo", { required: "El título es obligatorio" })}
                type="text"
                id="titulo"
                placeholder="Ej: El Principito"
                className="w-full campo"
                disabled={loading}
              />
              {errors.titulo && (
                <p className="text-[#DC3545] text-sm mt-1">{errors.titulo.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="precio" className="etiqueta block mb-1">
                Precio ($)
              </label>
              <input
                {...register("precio", {
                  required: "El precio es obligatorio",
                  min: { value: 1, message: "El precio debe ser mayor a 0" }
                })}
                type="number"
                id="precio"
                step="0.01"
                className="w-full campo"
                disabled={loading}
              />
              {errors.precio && (
                <p className="text-[#DC3545] text-sm mt-1">{errors.precio.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="imagen_url" className="etiqueta block mb-1">
                URL de Portada
              </label>
              <input
                {...register("imagen_url", { required: "La URL de la imagen es obligatoria" })}
                type="url"
                id="imagen_url"
                className="w-full campo"
                disabled={loading}
              />
              {errors.imagen_url && (
                <p className="text-[#DC3545] text-sm mt-1">{errors.imagen_url.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="descripcion" className="etiqueta block mb-1">
                Descripción
              </label>
              <textarea
                {...register("descripcion")}
                id="descripcion"
                rows={3}
                placeholder="Breve reseña del libro..."
                className="w-full campo"
                disabled={loading}
              />
            </div>

            {errorServidor && (
              <div className="rounded-md border border-red-400 bg-red-950/40 p-3 text-red-300 text-sm">
                <strong>Error de API:</strong> {errorServidor}
              </div>
            )}

            {mensajeExito && (
              <div className="rounded-md border border-green-400 bg-green-950/40 p-3 text-green-300 text-sm">
                {mensajeExito}
              </div>
            )}

            <button
              type="submit"
              className="boton w-full mt-2 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-600"></div>
              ) : (
                "Guardar Libro (POST /api/libros)"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LibroNuevo;

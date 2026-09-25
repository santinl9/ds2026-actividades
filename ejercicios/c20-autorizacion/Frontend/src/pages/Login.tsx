import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginValidado } from "../types/schemas/loginSchema";
import { apiFetch } from "../services/api";
import { guardarToken, obtenerToken, borrarToken } from "../services/sesion";

interface SesionResponse {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: "ADMIN" | "CLIENTE";
  };
}

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema)
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [tokenActual, setTokenActual] = useState<string | null>(obtenerToken());

  async function onSubmit(datos: LoginValidado) {
    try {
      setLoading(true);
      setErrorServidor(null);

      const sesion = await apiFetch<SesionResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(datos)
      }); //¿por qué no usa usePost?

      guardarToken(sesion.token);
      setTokenActual(sesion.token);
      navigate("/");
    } catch (err) {
      setErrorServidor(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    borrarToken();
    setTokenActual(null);
  }

  return (
    <div className="fondo min-h-screen py-8">
      <div className="container mx-auto max-w-md px-4">
        <h1 className="titulo text-center mb-6">Iniciar Sesión</h1>

        {tokenActual && (
          <div className="mb-6 rounded-md border border-green-300 bg-green-950/40 p-4 text-green-300 flex flex-col gap-2">
            <p className="text-sm">Actualmente hay una sesión activa guardada.</p>
            <button
              type="button"
              onClick={handleLogout}
              className="boton bg-red-800 hover:bg-red-700 text-white text-xs w-fit"
            >
              Cerrar sesión (Borrar token)
            </button>
          </div>
        )}

        <div className="header-footer rounded-lg p-6 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="etiqueta block mb-1">
                Correo Electrónico
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="ejemplo@libreria.test"
                className="w-full campo"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-[#DC3545] text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="etiqueta block mb-1">
                Contraseña
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full campo"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-[#DC3545] text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {errorServidor && (
              <div className="rounded-md border border-red-400 bg-red-950/40 p-3 text-red-300 text-sm">
                {errorServidor}
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
                "Ingresar"
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-700 pt-4 text-xs text-gray-400">
            <p className="font-semibold mb-1">Usuarios de prueba (Seed):</p>
            <p>Admin: <span className="text-gray-200">admin@libreria.test</span> / <span className="text-gray-200">Admin1234</span></p>
            <p>Cliente: <span className="text-gray-200">cliente@libreria.test</span> / <span className="text-gray-200">Cliente1234</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import type { Rol } from "../types/SessionType";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();
  // 1. ¿ya sé quién sos?
  if (cargando) return (
    <div className="flex justify-center items-center h-40">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
    </div>
)
  // 2. ¿sos alguien? (401)
  if (!usuario) return <Navigate to="/login" replace />;
  // 3. ¿podés? (403)
  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />; 
  // sí: pasá
  return <Outlet />;
}
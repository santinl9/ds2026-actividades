import { createContext, useEffect, useState, useContext, type ReactNode } from "react";

import { guardarToken, obtenerToken, borrarToken } from "../../services/sesion";
import { apiFetch } from "../../services/api";
import type { Usuario,Credenciales,Rol } from "../../types/SessionType"


interface AuthContextType {
    usuario: Usuario | null;            // null = nadie logueado
    cargando: boolean;                  // true mientras averiguamos quién sos
    estaAutenticado: boolean;           // usuario !== null, para leer más cómodo
    tieneRol: (rol: Rol) => boolean;    // usuario?.rol === rol
    login: (credenciales: Credenciales) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }){

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(obtenerToken() !== null);

    useEffect(() => {
      if (!obtenerToken()) return;    // sin token no hay nada que averiguar
      apiFetch<Usuario>('/auth/yo')
          .then(setUsuario)
          .catch(() => borrarToken())  // vencido o inválido: se limpia
          .finally(() => setCargando(false));
      window.addEventListener('sesion-expirada', logout);
      return () => window.removeEventListener('sesion-expirada', logout)
    }, []);

    const logout = () => {
        borrarToken();
        setUsuario(null);
    };

    const login = async (credenciales: Credenciales) => {
        
        // Login ya no toca el token ni el usuario, solo delega al Provider y navega a /catalogo
        
        //1. Hace POST /auth/login con las credenciales vía apiFetch.
        const data = await apiFetch<{ token: string; usuario: Usuario }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credenciales)
        });

        // 2. Guarda el token en localStorage con guardarToken (sesion.ts:2).
        guardarToken(data.token);

        // 3. Setea el usuario en el estado del Provider, lo que dispara estaAutenticado y tieneRol. 
        setUsuario(data.usuario);
    };

  return (
    <AuthContext.Provider value={{ 
        usuario, 
        cargando, 
        estaAutenticado: usuario !== null, 
        tieneRol: (rol: Rol) => usuario?.rol === rol, 
        login, 
        logout }}>

      {children}

    </AuthContext.Provider>
  );

}

// hook para consumirlo
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return contexto;
}
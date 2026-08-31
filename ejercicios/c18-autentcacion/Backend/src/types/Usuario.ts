export type { UsuarioModel as Usuario } from "../generated/prisma/models/Usuario.js";

export type UsuarioPublico={
    id: number;
    email: string;
    nombre: string;
    rol: "ADMIN" | "CLIENTE"
}
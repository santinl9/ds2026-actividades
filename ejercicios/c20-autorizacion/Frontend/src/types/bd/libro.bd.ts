import type { AutorBD } from "./autor.bd";
import type { CategoriaBD } from "./categoria.bd";

export interface LibroBD {
    id: string;
    titulo: string;
    autor_id: string | null;
    descripcion: string | null;
    precio: number;
    imagen_url: string;
}

export interface LibroXAutorXCategorias extends LibroBD {
    autor: AutorBD | null;
    categorias: CategoriaBD[];
}
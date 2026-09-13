export interface AutorUpdate {
    nombre?: string;
    fecha_nacimiento?: string | null;
}

export interface CategoriaUpdate {
    obras_asociadas?: number;
}

export interface LibroUpdate {
    titulo?: string;
    autor_id?: string | null;
    descripcion?: string | null;
    precio?: number;
    imagen_url?: string;
    categorias?: string[];
}
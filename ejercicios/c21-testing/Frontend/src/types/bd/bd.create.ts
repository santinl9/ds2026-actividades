export interface AutorCreate {
    id: string;
    nombre: string;
    fecha_nacimiento?: string | null;
}

export interface CategoriaCreate {
    id: string;
    obras_asociadas: number;
}

export interface LibroCreate {
    id: string;
    titulo: string;
    autor_id?: string | null;
    descripcion?: string | null;
    precio: number;
    imagen_url: string;
    categorias: string[];
}
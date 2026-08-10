import type { Libro } from "../types/Libro.js";

const libros: Libro[] = [
    { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry",
        precio: 4500, imagen: "https://...", disponible: false },
    { id: 2, titulo: "100 años de soledad", autor: "Gabriel García Márquez",
        precio: 6000, imagen: "https://...", disponible: true },
    { id: 3, titulo: "Cien años de soledad", autor: "Gabriel García Márquez",
        precio: 6000, imagen: "https://...", disponible: false },
    { id: 4, titulo: "El túnel", autor: "Ernesto Sabato",
        precio: 5000, imagen: "https://...", disponible: true },
];

let proximoId = 5;

export function findAll(disponible?: boolean): Libro[] {
    if (disponible === undefined) return libros;
    return libros.filter(libro => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
    return libros.find(libro => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
    const nuevo: Libro = { id: proximoId++, ...datos };
    libros.push(nuevo);
    return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
    const index = libros.findIndex(libro => libro.id === id);
    if (index === -1) return undefined;
    libros[index] = { id, ...datos };
    return libros[index];
}

export function remove(id: number): boolean {
    const index = libros.findIndex(libro => libro.id === id);
    if (index === -1) return false;
    libros.splice(index, 1);
    return true;
}
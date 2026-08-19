import { prisma } from "../config/prisma.js";

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

export async function findAll(disponible?: boolean): Promise<Libro[]> {
    if (disponible === undefined) return prisma.libro.findMany();
    return prisma.libro.findMany({where: {disponible}} );
}

export async function findById(id: number): Promise<Libro | null> {
    return prisma.libro.findUnique({where: {id}});
    //findUnique<T extends LibroFindUniqueArgs>(args: ...): ... | null, null, ...> por eso me pide "null" como salida
}

export async function create(datos: Omit<Libro, "id">): Promise<Libro> {
    return prisma.libro.create({data:datos});
}

export async function update(id: number, datos: Omit<Libro, "id">): Promise<Libro | null> {
    const existe = await prisma.libro.findUnique({where: {id}});
    if (!existe) return null;
    await prisma.libro.update({where: {id}, data: datos});
    return prisma.libro.findUnique({where: {id}});
}

export async function remove(id: number): Promise<boolean> {
    const existe= await prisma.libro.findUnique({where: {id}});
    if (!existe) return false;
    await prisma.libro.delete({where: {id}});
    return true
}
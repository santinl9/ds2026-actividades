import type { Categoria } from "../types/Categoria.js";
import { prisma } from "../config/prisma.js";
import type { CategoriaCreate, CategoriaUpdate } from "../types/schemas/categoria.schema.js";
import { Prisma } from "../generated/prisma/client.js";

type CategoriaXLibros = Prisma.CategoriaGetPayload<{include: {libros: true}}>

export async function findAll(): Promise<Categoria[]> {
    return prisma.categoria.findMany();
}

export async function findAll_libros(): Promise<CategoriaXLibros[]> {
    return prisma.categoria.findMany({
        include: {libros: true}
    });
}
  
export async function findById(id: string): Promise<Categoria | null> {
    return prisma.categoria.findUnique({
        where: { id }
    });
}

export async function findById_libros(id: string): Promise<Categoria | null> {
    return prisma.categoria.findUnique({
        where: { id },
        include: {libros: true}
    });
}

export async function create(datos: CategoriaCreate): Promise<Categoria> {
    return prisma.categoria.create({
        data:datos
    })
}
        

export async function update(id: string, datos: CategoriaUpdate): Promise<Categoria | null> {
    return prisma.categoria.update({
        where: { id },
        data: datos
    });
}

export async function remove(id: string): Promise<boolean> {
    const existe = await prisma.categoria.findUnique({ where: { id } });
    if (!existe) return false;
    await prisma.categoria.delete({ where: { id } });
    return true;
}
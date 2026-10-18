import type { Autor } from "../types/Autor.js";
import { prisma } from "../config/prisma.js";
import type { AutorCreate, AutorUpdate } from "../types/schemas/autor.schema.js";
import { Prisma } from "../generated/prisma/client.js";



export async function findAll(): Promise<Autor[]> {
    return prisma.autor.findMany();
}

type AutorXLibros = Prisma.AutorGetPayload<{include: {libros: true}}>

export async function findAll_libros(): Promise<AutorXLibros[]> {
  return prisma.autor.findMany({
    include:{libros: true}
  });
}
  
export async function findById(id: string): Promise<Autor | null> {
  return prisma.autor.findUnique({
    where: { id }
  });
}

export async function findById_libros(id: string): Promise<Autor | null> {
  return prisma.autor.findUnique({
    where: { id },
    include:{libros: true}
  });
}

export async function create(datos: AutorCreate): Promise<Autor> {
  return prisma.autor.create({
    data: datos
  });
}

export async function update(id: string, datos: AutorUpdate): Promise<Autor | null> {
  
  return prisma.autor.update({
    where: { id },
    data: datos
  });
}

export async function remove(id: string): Promise<boolean> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.autor.delete({ where: { id } });
  return true;
}
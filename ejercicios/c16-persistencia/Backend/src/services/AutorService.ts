import type { Autor } from "../types/Autor.js";
import { prisma } from "../config/prisma.js";

const autores: Autor[] = [
    { id: 1, nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
    { id: 2, nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
    { id: 3, nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
];

let proximoId = 4;

export async function findAll(): Promise<Autor[]> {
    return prisma.autor.findMany();
  }
  
  export async function findById(id: number): Promise<Autor | null> {
    return prisma.autor.findUnique({
      where: { id }
    });
  }
  
  export async function create(datos: Omit<Autor, "id">): Promise<Autor> {
    return prisma.autor.create({
      data: datos
    });
  }
  
  export async function update(id: number, datos: Partial<Omit<Autor, "id">>): Promise<Autor | null> {
    return prisma.autor.update({
      where: { id },
      data: datos
    });
  }
  
  export async function remove(id: number): Promise<boolean> {
    const existe = await prisma.autor.findUnique({ where: { id } });
    if (!existe) return false;
    await prisma.autor.delete({ where: { id } });
    return true;
  }
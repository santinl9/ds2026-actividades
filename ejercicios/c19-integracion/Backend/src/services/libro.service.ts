import { prisma } from "../config/prisma.js";
import type { Libro } from "../types/Libro.js";
import { Prisma } from "../generated/prisma/client.js";
import type { LibroCreate,LibroUpdate } from "../types/schemas/libro.schema.js";


export async function findById(id: string): Promise<LibroXAutorXCategorias | null> {
    return prisma.libro.findUnique({
        where: {id},
        include: {autor: true, categorias: true} // me trae el autor y las categorias asociadas.
    });
}

export type LibroXAutorXCategorias = Prisma.LibroGetPayload<{include: {autor: true, categorias:true}}>

export async function findAll(): Promise<LibroXAutorXCategorias[]> {
    return prisma.libro.findMany({
        include: {autor:true, categorias: true}
    });
}

export async function create(datos: LibroCreate): Promise<LibroXAutorXCategorias> {

    //si no hay autor persistido con esa id, se guarda autor_id=null
    let autor_id = datos.autor_id;
    if (autor_id) {
        const autorExiste = await prisma.autor.findUnique({ where: { id: autor_id } });
        if (!autorExiste) autor_id = null;
    }

    //si no hay categorias persistidas con esas id, se guarda categorias=[] (o las que sí haya)
    let categorias = datos.categorias
    if (categorias.length>0){
        const categorasExistentes= await prisma.categoria.findMany({ where: { id: { in: categorias } }}); 
        categorias= categorasExistentes.map(categoria => categoria.id)
    }

    return prisma.libro.create({
        data: {
            ...datos,
            autor_id,
            categorias: {
                connect: categorias.map(id_categoria => ({ id: id_categoria }))
            }
        },
        include: { autor: true, categorias: true }
    });
}

export async function update(id: string, datos: LibroUpdate): Promise<LibroXAutorXCategorias | null> {
    
    const existe = await prisma.libro.findUnique({where: {id}});
    if (!existe) return null;
    return prisma.libro.update({
        where: {id},
        data: {
            ...datos,
            categorias: {
                set: datos.categorias?.map(id_categoria => ({ id: id_categoria }))
            }
        },
        include: { autor: true, categorias: true }
    });
}

export async function remove(id: string): Promise<boolean> {
    const existe= await prisma.libro.findUnique({where: {id}});
    if (!existe) return false;
    await prisma.libro.delete({where: {id}});
    return true
}
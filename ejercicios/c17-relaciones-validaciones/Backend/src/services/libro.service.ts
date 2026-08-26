import { prisma } from "../config/prisma.js";
import type { Libro } from "../types/Libro.js";
import { Prisma } from "../generated/prisma/client.js";
import type { LibroCreate,LibroUpdate } from "../types/schemas/libro.schema.js";


export async function findById(id: string): Promise<Libro | null> {
    return prisma.libro.findUnique({
        where: {id},
        include: {autor: true, categorias: true} // me trae el autor y las categorias asociadas.
    });
}

/*export async function findAll(disponible?: boolean): Promise<Libro[]> {
    if (disponible === undefined) return prisma.libro.findMany();
    return prisma.libro.findMany({
        where: {disponible},
        include: {autor:true} //en findMany(), "include{...}" compila pero se rompe
    });
}*/ 
    //para que funcione:
export type LibroXAutorXCategorias = Prisma.LibroGetPayload<{include: {autor: true, categorias:true}}>

export async function findAll(): Promise<LibroXAutorXCategorias[]> {
    return prisma.libro.findMany({
        include: {autor:true, categorias: true}
    });
    //en findMany() "include{...}" compila pero se rompe. Para que funcione:
}

export async function create(datos: LibroCreate): Promise<Libro> {

    console.log("CATEGORIAS QUE LLEGAN:", datos.categorias);

    const categorias = await prisma.categoria.findMany({
        where: {
            id: {
                in: datos.categorias
            }
        },
        select: {
            id: true
        }
    });

    console.log("CATEGORIAS ENCONTRADAS:", categorias);

    return prisma.libro.create({
        data: {
            ...datos,
            categorias: {
                connect: datos.categorias.map(id_categoria => ({ id: id_categoria })) //recibe id's (que valida zod) pero prisma resuelve conectándolo con las entidades.
                    //connect espera: [{id:"valor_id"},...]. map hace esa transformación
            }
        },
    });
}

export async function update(id: string, datos: LibroUpdate): Promise<Libro | null> {
    
    const existe = await prisma.libro.findUnique({where: {id}});
    if (!existe) return null;
    await prisma.libro.update({
        where: {id},
        data: {
            ...datos,
            categorias: {
                set: datos.categorias?.map(id_categoria => ({ id: id_categoria })) //set reemplaza las relaciones actuales. Hace un conect internamente
            }
        }
    });
    return prisma.libro.findUnique({where: {id}});
}

export async function remove(id: string): Promise<boolean> {
    const existe= await prisma.libro.findUnique({where: {id}});
    if (!existe) return false;
    await prisma.libro.delete({where: {id}});
    return true
}
//los default van en prisma, no en la validación.
import { z } from "zod"

export const LibroCreateSchema= z.object({
    id: z.string().trim().min(3, "el id es obligatorio").startsWith("OL").endsWith("W"),
    titulo: z.string().trim().min(1, "el titulo es obligatorio"),
    imagen_url: z.string().trim().startsWith("https://covers.openlibrary.org/b/id/").endsWith("-M.jpg"),
    autor_id: z.string().trim().nullable().optional().transform(v=> (v=="" || v== undefined)? null: v),
    descripcion: z.string().trim().min(10, "La descripción no puede ser tan corta").nullable().optional().transform(v=> v?? null),
    precio: z.number().positive("no te voy a pagar el libro"),
    categorias: z.array(z.string().toLowerCase().trim()).optional().default([]) //toLowerCase() importante para que encuentre el connect.
        /* 
        "autor: Autor" no va porque la relación vive en el id.
        En cambio, la relacion con las categorías vive en ese arreglo.
        */
})

export const LibroUpdateSchema = LibroCreateSchema.omit({id: true}).partial()
    //omito el id porque el id no se puede updatear

export type LibroCreate = z.infer<typeof LibroCreateSchema>
export type LibroUpdate = z.infer<typeof LibroUpdateSchema>

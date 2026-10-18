import { z } from "zod"

export const CategoriaCreateSchema = z.object({
    id: z.string().trim().min(1, "el nombre debe tener al menos un caracter").toLowerCase(),
    obras_asociadas: z.int().positive()
    //la relacion con libros surge de cargarlo en la dirección opuesta
})

export const CategoriaUpdateSchema = CategoriaCreateSchema.omit({id: true}).partial()

export type CategoriaCreate = z.infer<typeof CategoriaCreateSchema>
export type CategoriaUpdate = z.infer<typeof CategoriaUpdateSchema>

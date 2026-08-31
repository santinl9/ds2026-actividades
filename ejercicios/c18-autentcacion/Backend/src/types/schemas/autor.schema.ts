import { z } from "zod"

export const AutorCreateSchema = z.object({ //se usa para validar en runtime (en las rutas)
    id: z.string().trim().min(3, "el id es obligatorio").startsWith("OL").endsWith("A"),
    nombre: z.string().trim().min(1, "el nombre debe tener al menos un caracter"),
    fecha_nacimiento: z.string().trim().min(10, "Esa no es una fecha válida").nullable().optional().transform(v=> v?? null)
})

export const AutorUpdateSchema = AutorCreateSchema.omit({id: true}).partial()

export type AutorCreate = z.infer<typeof AutorCreateSchema> //se usa para validar sintaxis (en los controller)
export type AutorUpdate = z.infer<typeof AutorUpdateSchema>

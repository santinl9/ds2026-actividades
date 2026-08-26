import {z} from "zod"

const ParamSchema = z.object({
    id: z.coerce.string("el id debe ser un string").trim().min(1, "no se puede pasar una id vacía")
})

export type ParamSchema = z.infer< typeof ParamSchema>
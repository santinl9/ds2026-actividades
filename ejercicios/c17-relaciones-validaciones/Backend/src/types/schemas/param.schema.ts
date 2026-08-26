import {z} from "zod"

export const ParamSchema = z.object({
    id: z.coerce.string("el id debe ser un string").trim().min(1, "no se puede pasar una id vacía")
})

export type Param = z.infer< typeof ParamSchema>
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client.js";

//es global, se registra en el index
//next lo usa para manejar errores independientemente del nombre **porque tiene 4 parámetros** 
    //por eso los parámetros sin uso quedan igual (con "_")
    
export const errorHandler= (err: unknown, _req: Request, res: Response, _next: NextFunction) =>{
    
    if (err instanceof ZodError){
        return res.status(400).json({
            error: "datos inválidos",
            detalles: err.issues.map (i => ({
                campo: i.path.join("."), 
                    //path: ["campo": string, "posicion": int, "subcampo": string ]
                    //si el campo es de un solo elemento: "id", path: ["campo":string]
                mensaje: i.message
            }))
        })
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) { //errores contemplados por prisma
        if (err.code === "P2002") return res.status(409).json({ error: "Ya existe un registro con ese valor" });
        if (err.code === "P2025") return res.status(404).json({ error: "No encontrado" });
        if (err.code === "P2003") return res.status(409).json({ error: "Hay registros relacionados" });
    }

    console.log(err)
    return res.status(500).json({error: "Error interno del servidor"}) //en caso que no sea un error contemplado por el schemaZod ni por Prisma
}
import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

//es una fábrica, se registra por cada .routes
//next lo usa para validar independientemente del nombre **porque tiene 3 parámetros** 
    //por eso los parámetros sin uso quedan igual (con "_")

export const validate = (schema: ZodType) => {
    return (req: Request, _res: Response, next: NextFunction) =>{
        
        const resultado= schema.safeParse(req.body);
            //schema.safeparse(req.body) => {succes: bool, data: <inferido del schema>}

        if (!resultado.success) return next(resultado.error);
            //si falla le paso a next el error, va a usar el middleware de error (de 4 parámetros)

        req.body= resultado.data;
        next() //si no le paso nada va al próximo middleware convencional (de 3 parámetros)
    }
}

export const validateParams=( schema: ZodType)=>{

    return (req:Request, _res: Response, next: NextFunction)=>{

        const resultado = schema.safeParse(req.params)

        if ( !resultado.success) return next(resultado.error)

        next()
    }
}
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken"

import type { PayloadToken } from "../types/Payload.js";

//quién sos?
export function authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
        //en el httmp request se manda 'headers: { ..., "authorization": ´Baerer ${token}´ }'
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Falta el token" });
    }
    try {
        const payload = jwt.verify(header.slice(7), JWT_SECRET) as PayloadToken;
        /* verify(): 
            1. extrae el Header (para saber con que algoritmo está encritpado) y el Payload
            2. Recalcula la firma con JWT_SECRET
            3. Verifica que no esté expirado
            4. Devuelve el Payload: {id:..., rol:...} decodificado
        */
        req.usuario = { id: payload.id, rol: payload.rol }; //inyecta el usuario a la request
        next();

    } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: "Token expirado" });
    }
        return res.status(401).json({ error: "Token inválido" });
    }   
}

//qué podés hacer?
export function authorize(...roles: Array<"ADMIN" | "CLIENTE">) {
    return (req: Request, res: Response, next: NextFunction) => {
        
        if (!req.usuario) return res.status(401).json({ error: "No autenticado" }); 

        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({ error: "No tenés permiso para esta operación" });
        }
        next();
    };
}
   
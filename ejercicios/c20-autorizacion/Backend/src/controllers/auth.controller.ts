import * as authService from "../services/auth.service.js"
import type { Request, Response } from "express";

export async function registrar(req: Request, res: Response) {
    const usuario = await authService.registrar(req.body); 
    //no hay error que cubrir porque el único error posible es que ya exista y lo cubre el errorHandler con P2002 "error: {Ya existe un registro con ese valor}"

    return res.status(201).json(usuario);
}

export async function login(req: Request, res: Response) {
    const resultado = await authService.login(req.body);
    if (!resultado) return res.status(401).json({ error: "Credenciales inválidas" }); //no hay error conocido para "no encontrado", simplemente devuelve null
    
    return res.status(201).json(resultado);
}

export async function yo(req: Request, res: Response){
    const usuario = await authService.findById(req.usuario!.id) //"usuario!" le asegura a typescript que usuario!= null | undefined 
        //auth.middleware.ts.authenticate() inyecta el usuario en la request (req.usuario={id:..., rol:...}). Si esto no pasa siquiera llega al controller

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    
    return res.status(201).json(usuario);
}
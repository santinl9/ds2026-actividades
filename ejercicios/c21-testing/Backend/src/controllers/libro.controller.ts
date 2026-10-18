import type { Request, Response } from "express";
import * as libroService from "../services/libro.service.js";
import type { LibroCreate,LibroUpdate } from "../types/schemas/libro.schema.js";

export async function getAll(_req: Request, res: Response) {
    /*try{
        res.json(libroService.findAll());
    }
    catch (error){
        return res.status(500).json({ error: "Error interno del servidor"})
    }*/ //los try-catch no van más, ahora se encarga en errorHandler antes de que llegue al controller
    return res.json( await libroService.findAll())
}

export async function getById(req: Request<{id: string}>, res: Response) { // "<{id: string}>" para que typescript no me haga quilombo

        const libro = await libroService.findById(req.params.id);
        if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
        return res.json(libro);
 
}

export async function create(req: Request, res: Response) {

    const datos:LibroCreate = req.body; 
    const nuevo = await libroService.create(datos);
    res.status(201).json(nuevo);

}

export async function update(req: Request<{id: string}>, res: Response) {

    const datos: LibroUpdate = req.body;
    const actualizado = await libroService.update(req.params.id, datos);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);

}

export async function remove(req: Request<{id: string}>, res: Response) {

    const ok = await libroService.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send();

}
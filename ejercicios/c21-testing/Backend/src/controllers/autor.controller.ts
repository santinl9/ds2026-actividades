import type { Request, Response } from "express";
import * as autorService from "../services/autor.service.js";
import type { AutorCreate, AutorUpdate } from "../types/schemas/autor.schema.js";

export async function getAll(req: Request, res: Response) {

    const {libros} = req.query;

    if (libros == "true"){
        res.json( await autorService.findAll_libros()); 
    }
    res.json( await autorService.findAll());
}

export async function getById(req: Request <{id: string}>, res: Response) {

    const {libros} =req.query;

    if (libros == "true"){
        const autor = await autorService.findById_libros(req.params.id);
        if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
        return res.json(autor);
    }

    const autor = await autorService.findById(req.params.id);
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(autor);
    
}

export async function create(req: Request, res: Response) {

    const datos: AutorCreate = req.body;
    const nuevo = await autorService.create(datos);
    res.status(201).json(nuevo);

}

export async function update(req: Request <{id: string}>, res: Response) {

    const datos: AutorUpdate = req.body;
    const actualizado = await autorService.update(req.params.id, datos);
    if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(actualizado);

}

export async function remove(req: Request <{id: string}>, res: Response) {

    const ok = await autorService.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
    return res.status(204).send();

}
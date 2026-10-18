import type { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service.js";
import type { CategoriaCreate, CategoriaUpdate } from "../types/schemas/categoria.schema.js";

export async function getAll(req: Request, res: Response) {

    const {libros} = req.query;

    if (libros== "true"){
        return res.json(await categoriaService.findAll_libros())
    }

    return res.json(await categoriaService.findAll());
}

export async function getById(req: Request<{id: string}>, res: Response) {
    const { libros } = req.query;
    
    if(libros==" true"){
        const categoria = await categoriaService.findById_libros(req.params.id);
        if (!categoria) return res.status(404).json({ error: "Categoria no encontrado" });
        return res.json(categoria);
    }
    const categoria = await categoriaService.findById(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoria no encontrado" });
    return res.json(categoria);

}

export async function create(req: Request, res: Response) {
    
    const datos:CategoriaCreate = req.body; 
    const nuevo = await categoriaService.create(datos);
    res.status(201).json(nuevo);
    

}

export async function update(req: Request<{id: string}>, res: Response) {

    const datos: CategoriaUpdate = req.body;
    const actualizado = await categoriaService.update(req.params.id, datos);
    if (!actualizado) return res.status(404).json({ error: "Categoria no encontrado" });
    return res.json(actualizado);

}

export async function remove(req: Request<{id: string}>, res: Response) {

    const ok = await categoriaService.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Categoria no encontrado" });
    return res.status(204).send();

}
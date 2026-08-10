import type { Request, Response } from "express";
import type { Autor } from "../types/Autor.js";
import * as autorService from "../services/AutorService.js";

export function getAll(_req: Request, res: Response) {
    res.json(autorService.findAll());
}

export function getById(req: Request, res: Response) {
    const autor = autorService.findById(Number(req.params.id));
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(autor);
}

export function create(req: Request, res: Response) {
    const datos: Omit<Autor, "id"> = req.body;
    const nuevo = autorService.create(datos);
    res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
    const datos: Omit<Autor, "id"> = req.body;
    const actualizado = autorService.update(Number(req.params.id), datos);
    if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
    const ok = autorService.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
    return res.status(204).send();
}
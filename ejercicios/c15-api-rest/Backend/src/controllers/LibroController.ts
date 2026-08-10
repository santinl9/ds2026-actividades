import type { Request, Response } from "express";
import type { Libro } from "../types/Libro.js";
import * as libroService from "../services/LibroService.js";

export function getAll(req: Request, res: Response) {
    const { disponible } = req.query;

    if (disponible === undefined) {
        res.json(libroService.findAll());
        return;
    }
    res.json(libroService.findAll(disponible === "true"));
}

export function getById(req: Request, res: Response) {
    const libro = libroService.findById(Number(req.params.id));
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(libro);
}

export function create(req: Request, res: Response) {
    const datos: Omit<Libro, "id"> = req.body;
    const nuevo = libroService.create(datos);
    res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
    const datos: Omit<Libro, "id"> = req.body;
    const actualizado = libroService.update(Number(req.params.id), datos);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
    const ok = libroService.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send();
}
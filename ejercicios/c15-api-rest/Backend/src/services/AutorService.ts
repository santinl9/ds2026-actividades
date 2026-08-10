import type { Autor } from "../types/Autor.js";

const autores: Autor[] = [
    { id: 1, nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
    { id: 2, nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
    { id: 3, nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
];

let proximoId = 4;

export function findAll(): Autor[] {
    return autores;
}

export function findById(id: number): Autor | undefined {
    return autores.find(autor => autor.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
    const nuevo: Autor = { id: proximoId++, ...datos };
    autores.push(nuevo);
    return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
    const index = autores.findIndex(autor => autor.id === id);
    if (index === -1) return undefined;
    autores[index] = { id, ...datos };
    return autores[index];
}

export function remove(id: number): boolean {
    const index = autores.findIndex(autor => autor.id === id);
    if (index === -1) return false;
    autores.splice(index, 1);
    return true;
}
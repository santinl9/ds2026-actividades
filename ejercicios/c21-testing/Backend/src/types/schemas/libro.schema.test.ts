import { describe, it, expect } from "vitest";
import { LibroCreateSchema } from "./libro.schema.js";
import { ParamSchema } from "./param.schema.js";

const libroValido = {
    id: "OL778W",
    titulo: "Rayuela",
    imagen_url: "https://covers.openlibrary.org/b/id/8294078-M.jpg",
    autor_id: null,
    descripcion: "Una novela clásica de Julio Cortázar",
    precio: 7000,
    categorias: [],
};

describe("LibroCreateSchema", () => {
    it("rechaza precio negativo", () => {
        const r = LibroCreateSchema.safeParse({ ...libroValido, precio: -5 });
        expect(r.success).toBe(false);
        if (!r.success) expect(r.error.issues[0]?.path).toEqual(["precio"]);
    });

    it("recorta espacios del título", () => {
        const r = LibroCreateSchema.safeParse({ ...libroValido, titulo: "  Rayuela  " });
        expect(r.success).toBe(true);
        if (r.success) expect(r.data.titulo).toBe("Rayuela");
    });
});

describe("ParamSchema", () => {
    it("convierte id a string y recorta espacios", () => {
        const r = ParamSchema.safeParse({ id: "  OL778W  " });
        expect(r.success).toBe(true);
        if (r.success) expect(r.data.id).toBe("OL778W");
    });
});

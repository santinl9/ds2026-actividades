import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import { JWT_SECRET } from "../config/env.js";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

const libroNuevo = {
    id: "OL778W",
    titulo: "Rayuela",
    imagen_url: "https://covers.openlibrary.org/b/id/8294078-M.jpg",
    autor_id: null,
    descripcion: "Una novela clásica de Julio Cortázar",
    precio: 7000,
    categorias: [],
};

describe("Matriz de permisos y validaciones sin DB (/api/libros)", () => {
    it("POST /api/libros sin token → 401 'Falta el token'", async () => {
        const res = await request(app).post("/api/libros").send(libroNuevo);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: "Falta el token" });
    });

    it("POST /api/libros con rol sin permiso (ADMIN en ruta de CLIENTE) → 403", async () => {
        const res = await request(app)
            .post("/api/libros")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .send(libroNuevo);
        expect(res.status).toBe(403);
    });

    it("POST /api/libros con rol autorizado (CLIENTE) y body inválido ({ precio: -5 }) → 400, no 403", async () => {
        const res = await request(app)
            .post("/api/libros")
            .set("Authorization", `Bearer ${tokenCliente}`)
            .send({ ...libroNuevo, precio: -5 });
        expect(res.status).toBe(400);
        expect(res.body.detalles).toContainEqual({
            campo: "precio",
            mensaje: "no te voy a pagar el libro",
        });
    });

    it("POST /api/libros con token adulterado → 401 'Token inválido'", async () => {
        const res = await request(app)
            .post("/api/libros")
            .set("Authorization", `Bearer ${tokenCliente}adulterado`)
            .send(libroNuevo);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: "Token inválido" });
    });

    it("DELETE /api/libros/OL778W con token de CLIENTE → 403", async () => {
        const res = await request(app)
            .delete("/api/libros/OL778W")
            .set("Authorization", `Bearer ${tokenCliente}`);
        expect(res.status).toBe(403);
    });

    it("GET /api/no-existe → 404 'Ruta no encontrada'", async () => {
        const res = await request(app).get("/api/no-existe");
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "Ruta no encontrada" });
    });
});

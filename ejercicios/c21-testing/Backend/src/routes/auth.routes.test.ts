// IMPORTANTE: Estos tests requieren que la base de datos de Docker esté corriendo
// (`docker compose up -d db`) y tenga el seed cargado (`npx prisma db seed`).

import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/prisma.js";

afterAll(() => prisma.$disconnect());

describe("Rutas de autenticación contra la DB (/api/auth)", () => {
    it("credenciales del seed → 201 con token y usuario sin passwordHash", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "cliente@libreria.test", password: "Cliente1234" });

        expect(res.status).toBe(201);
        expect(res.body.token).toEqual(expect.any(String));
        expect(res.body.usuario).toMatchObject({
            email: "cliente@libreria.test",
            rol: "CLIENTE",
        });
        expect(res.body.usuario).not.toHaveProperty("passwordHash");
    });

    it("password incorrecta → 401 'Credenciales inválidas'", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "cliente@libreria.test", password: "Incorrecta1" });

        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: "Credenciales inválidas" });
    });

    it("mail que no existe → el MISMO 401 (no revela si el mail existe)", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "nadie@libreria.test", password: "Cliente1234" });

        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: "Credenciales inválidas" });
    });

    it("GET /api/auth/yo con el token del login → 201 con los datos del usuario", async () => {
        const loginRes = await request(app)
            .post("/api/auth/login")
            .send({ email: "cliente@libreria.test", password: "Cliente1234" });

        const res = await request(app)
            .get("/api/auth/yo")
            .set("Authorization", `Bearer ${loginRes.body.token}`);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            email: "cliente@libreria.test",
            rol: "CLIENTE",
        });
        expect(res.body).not.toHaveProperty("passwordHash");
    });
});

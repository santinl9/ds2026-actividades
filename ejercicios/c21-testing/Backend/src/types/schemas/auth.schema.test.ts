import { describe, it, expect } from "vitest";
import { loginSchema, registroSchema } from "./auth.schema.js";

describe("loginSchema", () => {
    it("normaliza el email: saca espacios y pasa a minúsculas", () => {
        const r = loginSchema.safeParse({ email: "  Admin@Libreria.TEST  ", password: "x" });
        expect(r.success).toBe(true);
        if (r.success) expect(r.data.email).toBe("admin@libreria.test");
    });

    it("rechaza email con formato inválido", () => {
        const r = loginSchema.safeParse({ email: "no-es-un-email", password: "x" });
        expect(r.success).toBe(false);
    });
});

describe("registroSchema", () => {
    it("una contraseña débil acumula los tres errores", () => {
        const r = registroSchema.safeParse({
            nombre: "Ana",
            email: "ana@libreria.test",
            password: "corta",
        });
        expect(r.success).toBe(false);
        if (!r.success) expect(r.error.issues.map((i) => i.message)).toHaveLength(3);
    });

    it("acepta un registro válido con contraseña de 8+ caracteres, mayúscula y número", () => {
        const r = registroSchema.safeParse({
            nombre: "Ana",
            email: "ana@libreria.test",
            password: "Password1",
        });
        expect(r.success).toBe(true);
    });
});

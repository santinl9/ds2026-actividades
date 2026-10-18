import { z } from "zod";

export const contactoSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio"),

    email: z
        .email("El email no es válido"),
        
    asunto: z
        .string()
        .trim()
        .min(1, "El asunto es obligatorio"),

    mensaje: z
        .string()
        .trim()
        .min(1, "El mensaje es obligatorio"),
});

export type ContactoValidado = z.infer<typeof contactoSchema>;
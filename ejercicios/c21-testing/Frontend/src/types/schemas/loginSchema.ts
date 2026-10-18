import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Debe ser un email válido"),
  password: z.string().min(1, "La contraseña es requerida")
});

export type LoginValidado = z.infer<typeof loginSchema>;

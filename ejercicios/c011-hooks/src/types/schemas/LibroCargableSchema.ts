import {z} from 'zod';

export const libroCargableSchema = z.object({

    titulo: z.string().trim().min(1, 'El titulo es obligatorio'),
    autor: z.string().optional(),
    precio: z.number().positive('El precio debe ser mayor a 0')

});

export type LibroValidado = z.infer<typeof libroCargableSchema>
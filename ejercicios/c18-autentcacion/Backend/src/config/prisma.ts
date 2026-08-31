import { PrismaClient } from "../generated/prisma/client.js";
//import { PrismaPg } from "@prisma/adapter-pg";

/*const adapter = new PrismaPg({ connectionString: 
process.env.DATABASE_URL });*/

export const prisma = new PrismaClient({
    /*adapter*/ 
    omit: { usuario: { passwordHash: true } } //prisma ya no puede acceder a passwordHash por defecto
});

////// el adapter no hace falta porque uso "url= env("DATABASE_URL")" en vez de la url en prisma.config.ts

import { PrismaClient } from "../generated/prisma/client.js";
//import { PrismaPg } from "@prisma/adapter-pg";

// El adapter es el driver: el que realmente habla TCP con PostgreSQL.

/*const adapter = new PrismaPg({ connectionString: 
process.env.DATABASE_URL });*/

// Una sola instancia para toda la app: abre un pool de conexiones y lo reusa.
export const prisma = new PrismaClient(/*{ adapter }*/);

////// el adapter no hace falta porque uso "url= env("DATABASE_URL")" en vez de la url en prisma.config.ts
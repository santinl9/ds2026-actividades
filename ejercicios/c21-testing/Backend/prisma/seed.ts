// ../prisma.config.ts#F7

import {prisma} from "../src/config/prisma.js"
import bcrypt from "bcrypt"

const usuarios = [
    { email: "admin@libreria.test",   nombre: "Admin",   rol: "ADMIN"   as  const, password: "Admin1234" },
    { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as  const, password: "Cliente1234" },
  ];

for (const { password, ...datos } of usuarios) { 
    await prisma.usuario.upsert({
        where:  { email: datos.email },  
        update: {},
        create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
}

//'docker compose exec api npx prisma db seed' la primera vez
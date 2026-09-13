import type { Registro, Login } from "../types/schemas/auth.schema.js";
import { JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from "../config/env.js";
import { prisma } from "../config/prisma.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import type { UsuarioPublico } from "../types/Usuario.js";


export async function findById(id: number): Promise<UsuarioPublico| null>{

    const usuario= await prisma.usuario.findUnique({
        where:{id: id},
        select:{
            id: true,
            email: true,
            nombre: true,
            rol: true
        }
    })
    return usuario
}

//registrarme solo persiste mi usuario con una contraseña hasheada, en el login ocurre la magia jwt
export async function registrar(datos: Registro): Promise<UsuarioPublico> {   
    const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);
        //bcrypt genera un SALT automáticamente
        //el SALT se agrega a la contraseña antes de hashearla (dos contraseñas iguales tienen distinto hash)

    return prisma.usuario.create({
        data: {
            nombre: datos.nombre,
            email: datos.email,
            passwordHash: hash 
        },
        select: {
            id: true,
            email: true,
            nombre: true,
            rol: true 
        }, // nunca el hash
    });
}

export async function login(datos: Login) {

    const usuario = await prisma.usuario.findUnique({
        where: { email: datos.email },
        omit:  { passwordHash: false }, // el omit global lo esconde: acá lo necesito
    });

    if (!usuario) return null;
    
    const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);

    if (!coincide) return null; 

    const payload = { id: usuario.id, rol: usuario.rol }; //la forma luego se valida antes en el auth.middleware 
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); //sign crea el Header automáticamente
        /*
        1. HEADER:      Genera un header por defecto {"alg": "HS256", "typ": "JWT"} y lo pasa a Base64Url
        2. PAYLOAD:     Toma el objeto "payload", le agrega iat:"" y exp:"" automáticamente y lo pasa a Base64Url
        3. SIGNATURE:   Firma el header y el payload criptográficamente usando la clave del JWT_SECRET
        4. Devuelve el token: HEADER.PAYLOAD.SIGNATURE en Base64Url 
        */

    return { 
        token,
        usuario: { 
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol 
        } 
    };
}
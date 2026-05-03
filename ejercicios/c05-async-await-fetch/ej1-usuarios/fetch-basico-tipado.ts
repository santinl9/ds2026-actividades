import { obtenerUsuarios } from "./fetch-basico-tipado_obtenerUsuarios.js";

const usuarios = await obtenerUsuarios();

usuarios.forEach(element => {
    console.log(`Nombre:${element.name} - Mail:${element.email}`);
});
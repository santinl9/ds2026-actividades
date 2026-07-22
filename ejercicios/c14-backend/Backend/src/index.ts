import express from "express";
import type { Libro } from "./interfaces/Libro.js";
import type { Autor } from "./interfaces/Autor.js";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const libros: Libro[] = [
    { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry",
        precio: 4500, imagen: "https://...", disponible: false },
    { id: 2, titulo: "100 años de soledad", autor: "Gabriel García Márquez",
        precio: 6000, imagen: "https://...", disponible: true },
    { id: 3, titulo: "Cien años de soledad", autor: "Gabriel García Márquez",
        precio: 6000, imagen: "https://...", disponible: false },
    { id: 4, titulo: "El túnel", autor: "Ernesto Sabato",
        precio: 5000, imagen: "https://...", disponible: true },
];

const autores: Autor[] = [
    { id: 1, nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
    { id: 2, nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
    { id: 3, nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
];

//(req, res) van siempre, pero cuando no se le pasa parámetros por convención se pone "_req"

app.get("/", (_req, res) => { 
    res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.get("/libros", (req, res)=>{ //los parámetros son todo lo que va después del "?"
    const {disponible} = req.query; //req.query es un objeto {...}, me quedo solo con "disponible"

    if (disponible== undefined){ //si no le llega "{disponible=true}" por parámetro
        res.json(libros);
        return;
    }
    else if (disponible !== undefined){ //contempla que se pueda filtrar por ambos casos
        res.json(libros.filter(libro => libro.disponible === (disponible === "true") )); //si disponible es true compara con true y si es false con false
    }
    else {
        res.json(libros); //si me pasan un parámetro inválido
    }
})

app.get("/autores", (_req, res)=>{
    res.json(autores);
})
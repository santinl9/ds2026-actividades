import { prisma } from "../src/config/prisma";

const libros = [
    { titulo: "El principito", autor: "Antoine de Saint-Exupéry",
        precio: 4500, imagen: "https://...", disponible: false },
    { titulo: "100 años de soledad", autor: "Gabriel García Márquez",
        precio: 6000, imagen: "https://...", disponible: true },
    { titulo: "Cien años de soledad", autor: "Gabriel García Márquez",
        precio: 6000, imagen: "https://...", disponible: false },
    { titulo: "El túnel", autor: "Ernesto Sabato",
        precio: 5000, imagen: "https://...", disponible: true },
];

const autores = [
    { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
    { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
    { nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
];
async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}
main();
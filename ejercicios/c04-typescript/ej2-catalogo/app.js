import { Libro, Catalogo } from './clases.js';
const crearLibroHTML = (libro) => {
    let libroHTML = document.createElement('li');
    let titulo = document.createElement('h3');
    titulo.innerHTML = libro.verTitulo();
    let datos = document.createElement('p');
    datos.innerHTML = `Autor: ${libro.verAutor()} <br> Precio: $${libro.verPrecio()} <br> Disponible: ${libro.verDisponibilidad() ? 'Sí' : 'No'}`;
    let isbn = document.createElement('p');
    isbn.className = 'isbn';
    isbn.innerHTML = libro.verISBN();
    let botonEliminar = document.createElement('button');
    botonEliminar.className = 'eliminarLibro';
    botonEliminar.innerHTML = 'Eliminar';
    let botonDisponibilidad = document.createElement('button');
    botonDisponibilidad.className = 'cambiarDisponibilidad';
    botonDisponibilidad.innerHTML = 'cambiar disponibilidad';
    libroHTML.appendChild(titulo);
    libroHTML.appendChild(datos);
    libroHTML.appendChild(isbn);
    libroHTML.appendChild(botonEliminar);
    libroHTML.appendChild(botonDisponibilidad);
    return libroHTML;
};
const cargarLibroHTML = (libroHTML) => {
    listaLibros.appendChild(libroHTML);
};
const eliminarLibroHTML = (libroHTML) => {
    libroHTML.remove();
};
const renderizar = (libros) => {
    listaLibros.innerHTML = '';
    for (let libro of libros) {
        cargarLibroHTML(crearLibroHTML(libro));
    }
    stats.innerHTML =
        (`Libros totales:${catalogo.cantidadLibros(libros)}-
         Valor promedio ${Math.floor(catalogo.verPrecioTotal(libros) / catalogo.cantidadLibros(libros))}`);
};
const catalogo = Catalogo.crearCatalogo();
let botonLibro = document.querySelector('#cargaLibro');
let botonAutor = document.querySelector('#filtrar');
let botonDisponibles = document.querySelector('#mostrarDisponibles');
let botonTodos = document.querySelector('#mostrarTodos');
const listaLibros = document.querySelector('#lista');
const stats = document.querySelector('#stats');
botonLibro.addEventListener('click', () => {
    let libro = Libro.crearLibro(document.querySelector('#isbn').value, document.querySelector('#nombre').value, document.querySelector('#autor').value, Number(document.querySelector('#precio').value));
    catalogo.cargarLibro(libro);
    alert('Libro cargado exitosamente');
});
botonAutor.addEventListener('click', () => {
    let autor = document.querySelector('#filtroAutor').value;
    renderizar(catalogo.verAutor(autor));
});
botonDisponibles.addEventListener('click', () => {
    renderizar(catalogo.verDisponible());
});
botonTodos.addEventListener('click', () => {
    renderizar(catalogo.verLibros());
});
listaLibros.addEventListener('click', (event) => {
    let elemento = event.target;
    if (elemento.className == 'eliminarLibro') {
        let libroHTML = elemento.parentElement;
        //let isbn = (elemento.querySelector('.isbn') as HTMLParagraphElement).innerHTML; elemento es un botón 
        let isbn = libroHTML.querySelector('.isbn').innerHTML;
        catalogo.eliminarLibro(isbn);
        eliminarLibroHTML(libroHTML);
    }
    else if (elemento.className == 'cambiarDisponibilidad') {
        let libroHTML = elemento.parentElement;
        let isbn = libroHTML.querySelector('.isbn').innerHTML;
        let libro = catalogo.verLibros().find(libro => libro.verISBN() === isbn);
        if (libro) {
            eliminarLibroHTML(libroHTML);
            libro.cambiarDisponibilidad();
            cargarLibroHTML(crearLibroHTML(libro));
        }
    }
});

import { Libro, Catalogo } from './clases.js';
const crearLibroHTML = (libro) => {
    let libroHTML = document.createElement('li');
    let titulo = document.createElement('h3');
    titulo.innerHTML = libro.verTitulo();
    let datos = document.createElement('p');
    datos.innerHTML = `Autor: ${libro.verAutor()} <br> Precio: $${libro.verPrecio()} <br> Disponible: ${libro.verDisponibilidad() ? 'Sí' : 'No'}`;
    let isbn = document.createElement('p');
    isbn.className = 'isbnClass';
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
const listarLibroHTML = (libroHTML) => {
    listaLibros.appendChild(libroHTML);
};
/*const eliminarLibroHTML = (libroHTML : HTMLElement) : void => {
    libroHTML.remove();
}*/
const renderizar = (libros) => {
    listaLibros.innerHTML = '';
    for (let libro of libros) {
        listarLibroHTML(crearLibroHTML(libro));
    }
    stats.innerHTML =
        (`Libros totales:${catalogo.cantidadLibros(libros)}-
         Valor promedio ${Math.floor(catalogo.verPrecioTotal(libros) / catalogo.cantidadLibros(libros))}`);
};
const agregarLibro = (libro) => {
    catalogo.cargarLibro(libro);
    renderizar(catalogo.verLibros());
};
const eliminarLibro = (isbn) => {
    catalogo.eliminarLibro(isbn);
    renderizar(catalogo.verLibros());
};
const cambiarDisponibilidad = (Libro) => {
    Libro.cambiarDisponibilidad();
    renderizar(catalogo.verLibros());
};
const validarFormulario = () => {
    let titulo = document.querySelector('#titulo').value;
    let autor = document.querySelector('#autor').value;
    let precio = document.querySelector('#precio').value;
    if (titulo == '' || autor == '' || precio == '' || Number(precio) < 0) {
        return null;
    }
    else {
        let isbm = `AUTO-${Date.now().toString().slice(-6)}`;
        let libro = Libro.crearLibro(isbm, titulo, autor, Number(precio));
        return libro;
    }
};
const mostrarError = () => {
    let lista = document.createElement('ul');
    if (document.querySelector('#titulo').value == '') {
        let item = document.createElement('li');
        item.innerHTML = 'El campo Título no puede estar vacío';
        lista.appendChild(item);
    }
    if (document.querySelector('#autor').value == '') {
        let item = document.createElement('li');
        item.innerHTML = 'El campo Autor no puede estar vacío';
        lista.appendChild(item);
    }
    if (document.querySelector('#precio').value == '') {
        let item = document.createElement('li');
        item.innerHTML = 'El campo Precio no puede estar vacío';
        lista.appendChild(item);
    }
    else if (Number(document.querySelector('#precio').value) < 0) {
        let item = document.createElement('li');
        item.innerHTML = 'El campo Precio no puede ser negativo';
        lista.appendChild(item);
    }
    formulario.innerHTML = 'Error(es) de formulario:'; //esto hace que el formulario se pise por errores consecutivos
    formulario.appendChild(lista);
};
const vaciarCampos = () => {
    document.querySelector('#titulo').value = '';
    document.querySelector('#autor').value = '';
    document.querySelector('#precio').value = '';
    document.querySelector('#errorForm').innerHTML = '';
};
const catalogo = Catalogo.crearCatalogo();
let botonLibro = document.querySelector('#cargaLibro');
let botonAutor = document.querySelector('#filtrar');
let botonDisponibles = document.querySelector('#mostrarDisponibles');
let botonTodos = document.querySelector('#mostrarTodos');
const listaLibros = document.querySelector('#lista');
const stats = document.querySelector('#stats');
const formulario = document.querySelector('#errorForm');
botonLibro.addEventListener('click', () => {
    let libro = validarFormulario();
    if (libro !== null) {
        agregarLibro(libro);
        vaciarCampos();
    }
    else {
        mostrarError();
    }
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
        let isbn = libroHTML.querySelector('.isbnClass').innerHTML;
        eliminarLibro(isbn);
    }
    else if (elemento.className == 'cambiarDisponibilidad') {
        let libroHTML = elemento.parentElement;
        let isbn = libroHTML.querySelector('.isbnClass').innerHTML;
        let libro = catalogo.verLibros().find(libro => libro.verISBN() === isbn);
        if (libro) {
            // es innecesario, con solo actualizar el libro y renderizar es suficiente
            /*libro.cambiarDisponibilidad();
            let libro_temp = libro;

            eliminarLibro(isbn);
            agregarLibro(libro_temp);*/
            cambiarDisponibilidad(libro);
        }
    }
});

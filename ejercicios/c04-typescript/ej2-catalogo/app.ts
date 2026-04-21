import {Libro, Catalogo} from './clases.js';


const crearLibroHTML = (libro : Libro) : HTMLElement => {

    let libroHTML =document.createElement('li') as HTMLElement;
    
    let titulo = document.createElement('h3') as HTMLHeadingElement;
    titulo.innerHTML= libro.verTitulo();
    
    let datos = document.createElement('p') as HTMLParagraphElement;
    datos.innerHTML =`Autor: ${libro.verAutor()} <br> Precio: $${libro.verPrecio()} <br> Disponible: ${libro.verDisponibilidad() ? 'Sí' : 'No'}`;

    let isbn = document.createElement('p') as HTMLParagraphElement;
    isbn.className = 'isbn';
    isbn.innerHTML = libro.verISBN();

    let botonEliminar = document.createElement('button') as HTMLButtonElement;
    botonEliminar.className='eliminarLibro';
    botonEliminar.innerHTML= 'Eliminar';

    let botonDisponibilidad = document.createElement('button') as HTMLButtonElement;
    botonDisponibilidad.className='cambiarDisponibilidad';
    botonDisponibilidad.innerHTML= 'cambiar disponibilidad';


    libroHTML.appendChild(titulo);
    libroHTML.appendChild(datos);
    libroHTML.appendChild(isbn);
    libroHTML.appendChild(botonEliminar);
    libroHTML.appendChild(botonDisponibilidad);

    return libroHTML;

}

const cargarLibroHTML = (libroHTML : HTMLElement): void =>{

    listaLibros.appendChild(libroHTML);

}

const eliminarLibroHTML = (libroHTML : HTMLElement) : void => {
    libroHTML.remove();
}

const renderizar = (libros : Libro[]) : void => {

    listaLibros.innerHTML = '';

    for ( let libro of libros){

        cargarLibroHTML(crearLibroHTML(libro));
    }

    stats.innerHTML = 
        (`Libros totales:${catalogo.cantidadLibros(libros)}-
         Valor promedio ${Math.floor(catalogo.verPrecioTotal(libros)/catalogo.cantidadLibros(libros))}`);
}


const catalogo = Catalogo.crearCatalogo();
let botonLibro =document.querySelector('#cargaLibro') as HTMLButtonElement;
let botonAutor = document.querySelector('#filtrar') as HTMLButtonElement;
let botonDisponibles = document.querySelector('#mostrarDisponibles') as HTMLButtonElement;
let botonTodos = document.querySelector('#mostrarTodos') as HTMLButtonElement;

const listaLibros = document.querySelector('#lista') as HTMLElement;
const stats = document.querySelector('#stats') as HTMLParagraphElement;


botonLibro.addEventListener('click', () => {

    let libro = Libro.crearLibro(
        (document.querySelector('#isbn') as HTMLInputElement).value,
        (document.querySelector('#nombre') as HTMLInputElement).value,
        (document.querySelector('#autor') as HTMLInputElement).value,
        Number((document.querySelector('#precio') as HTMLInputElement).value)
    );

    catalogo.cargarLibro(libro);
    alert('Libro cargado exitosamente');

});

botonAutor.addEventListener('click', () => {

    let autor = (document.querySelector('#filtroAutor') as HTMLInputElement).value;

    renderizar(catalogo.verAutor(autor));

});

botonDisponibles.addEventListener('click', () => {
    
    renderizar(catalogo.verDisponible());

});

botonTodos.addEventListener('click', () => {
    
    renderizar(catalogo.verLibros());

});

listaLibros.addEventListener('click', (event) =>{

    let elemento = event.target as HTMLElement;

    if(elemento.className == 'eliminarLibro'){

        let libroHTML = elemento.parentElement as HTMLElement;
        //let isbn = (elemento.querySelector('.isbn') as HTMLParagraphElement).innerHTML; elemento es un botón 
        let isbn = (libroHTML.querySelector('.isbn') as HTMLParagraphElement).innerHTML;
        catalogo.eliminarLibro(isbn);

        eliminarLibroHTML(libroHTML);
    }
    else if (elemento.className == 'cambiarDisponibilidad'){

        let libroHTML = elemento.parentElement as HTMLElement;
        let isbn = (libroHTML.querySelector('.isbn') as HTMLParagraphElement).innerHTML;
        let libro = catalogo.verLibros().find(libro => libro.verISBN() === isbn);
        if (libro){
            eliminarLibroHTML(libroHTML);
            libro.cambiarDisponibilidad();
            cargarLibroHTML(crearLibroHTML(libro));
        }
    }

});